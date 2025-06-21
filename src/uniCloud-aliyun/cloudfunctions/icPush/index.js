// 简单的使用示例
'use strict';

const { log } = require("console");

const uniPush = uniCloud.getPushManager({appId:"__UNI__96C5C77"}) //注意这里需要传入你的应用appId，用于指定接收消息的客户端
exports.main = async (event, context) => {
	log(event)
	const allParams = JSON.parse(event.body)
	log("入参",allParams)
	//0 消息推送 1 其他
	return await uniPush.sendMessage({
		"push_clientid": allParams.pushClientId, 	//填写上一步在uni-app客户端获取到的客户端推送标识push_clientid
		"force_notification":true,
		"title": allParams.title,	
		"content": allParams.content,
		"payload": {
			pushType:allParams.pushType,
			allParams:JSON.stringify(allParams)
		}
	})
};
