import {
	message
} from "./util";
//const baseURL = "http://192.168.110.222:8081/"
const baseURL = "http://localhost:8081/"
const request = ({
	url,
	data,
	method = "POST"
}) => {

	const token = uni.getStorageSync("token")
	return new Promise((resolve, reject) => {
		const header = {};

		if (token) {
			header.Authorization = 'Bearer ' + token;
		}
		
		let reqUrl = baseURL+url
		uni.request({
			url: reqUrl,
			data: data,
			method: method,
			timeout: 10000,
			dataType: "json",
			header,
			success(res) {
				if (res.statusCode >= 200 && res.statusCode < 300) {
					const {
						code
					} = res.data;
					const _msg = res.data.msg || res.data.message
					if (code === 200) {
						return resolve(res.data.data);
					}
					if (code === 401) {
						message.toast(_msg);
						uni.clearStorage()
						uni.redirectTo({
							url:"/pages/login/login"
						})
					}
					console.log('-------',code)
					message.toast(_msg || res.error || "未知错误");
					reject(_msg); // 中止
				} else {
					message.error("请求失败请重试")
					reject(new Error("请求失败请重试"));
				}
			},
			fail(err) {
				console.log(err);
				message.error("请求失败请重试")
				reject(new Error("请求失败请重试"));
			}
		});
	});
};
export default request;