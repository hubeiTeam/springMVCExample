//获取用户的状态 (用户/企业)
function getUserStatus(code) {
	var res = {};
	res.code = code;
	switch (code) {
	case 'INIT':
		res.name = "未审核";
		break;
	case 'PERSON_AUDIT':
		res.name = "个人审核";
		break;
	case 'ENTERPRISE_AUDIT':
		res.name = "企业审核";
		break;
	case 'PERSON_COMPLETE':
		res.name = "审核通过";
		break;
	case 'ENTERPRISE_COMPLETE':
		res.name = "审核通过";
		break;
	case 'PERSON_RETREAT':
		res.name = "审核退回";
		break;
	case 'ENTERPRISE_RETREAT':
		res.name = "审核退回";
		break;
	}
	return res;
}
// 获取岗位的状态
function getPluralismStatus(code) {
	var res = {};
	res.code = code;
	switch (code) {
	case 'INIT':
		res.name = "未付款";
		break;
	case 'PAY_COMPLETE':
		res.name = "审核中";
		break;
	case 'PUBLISH_ING':
		res.name = "发布中";
		break;
	case 'HOUR_24':
		res.name = "紧急发布中";
		break;
	case 'SIGN_UP_FULL':
		res.name = "报名已满";
		break;
	case 'WAIT_WORK':
		res.name = "等待工作";
		break;
	case 'VERIFI_FULL':
		res.name = "审核已满";
		break;
	case 'OFFLINE':
		res.name = "下线";
		break;
	case 'WORK_ING':
		res.name = "工作开始";
		break;
	case 'VERIFICATION_FAIL':
		res.name = "审核失败";
		break;
	case 'COMPLETE':
		res.name = "岗位完成";
		break;
	case 'CLOSE':
		res.name = "放弃";
		break;
	case 'WORK_COMPLETE':
		res.name = "工作结束";
		break;
	case 'HOUR_24_SIGN_UP_FULL':
		res.name = "24小时报满";
		break;
	case 'HOUR_24_VERIFI_FULL':
		res.name = "24小时报名审核已满";
		break;
    }
	return res;
}

//红包状态
function getGiftStatus(code){
    var res = {};
    res.code = code;
    switch (code) {
    case 'UNUSED':
        res.name = "未使用";
        break;
    case 'USED':
        res.name = "已使用";
        break;
    case 'INVALID':
        res.name = "过期";
        break;
    }
    return res;
}
//保险状态
function getInsureStatus(code){
	var res = {};
    res.code = code;
    switch (code) {
	    case 'ALREADY_COMPLETE':
	        res.name = "已生效";
	        break;
	    case 'NO_COMPLETE':
	        res.name = "未生效";
	        break;
	    case 'CANCEL':
	        res.name = "取消";
	        break;
	    case 'PART_COMPLETE':
	        res.name = "部分完成";
	        break;
    }
    return res;
}
//系统状态
function getSystemStatus(code){
	var res = {};
    res.code = code;
    switch (code) {
	    case 'INIT':
	        res.name = "处理中";
	        break;
	    case 'COMPLETE':
	        res.name = "处理完成";
	        break;
    }
    return res;
}
//奖品领取状态
function getWinnerStatus(code){
	var res = {};
    res.code = code;
    switch (code) {
	    case 'NECK_ING':
	        res.name = "领取中";
	        break;
	    case 'NECK_COMPLETE':
	        res.name = "领取完毕";
	        break;
    }
    return res;
}
//邀请补贴状态
function getInviteSubsidyStatus(code){
	var res = {};
    res.code = code;
    switch (code) {
	    case 'REGISTER':
	        res.name = "注册完成";
	        break;
	    case 'ATTEST_COMPLETE':
	        res.name = "认证完成";
	        break;
	    case 'GIVE':
	        res.name = "已发放";
	        break;
    }
    return res;
}
//提现提取状态
function getExtractAmountStatus(code){
	var res = {};
    res.code = code;
    switch (code) {
	    case 'INIT':
	        res.name = "未提取";
	        break;
	    case 'FAIL':
	        res.name = "提现失败";
	        break;
	    case 'COMPLETE':
	        res.name = "提现成功";
	        break;
	    case 'RETREAT':
	        res.name = "提取驳回";
	        break;
    }
    return res;
}
//用户报名状态
function getSignUpStatus(code){
	var res = {};
    res.code = code;
    switch (code) {
	    case 'SIGN_UP':
	        res.name = "初始化";
	        break;
	    case 'ENROLL':
	        res.name = "录取";
	        break;
	    case 'REFUSE':
	        res.name = "拒绝";
	        break;
	    case 'NO_PROMISE':
	        res.name = "爽约";
	        break;
	    case 'HOUR_24':
	        res.name = "等待工作";
	        break;
	    case 'WORK_ING':
	        res.name = "工作中";
	        break;
	    case 'WORK_COMPLETE':
	        res.name = "工作结束";
	        break;
	    case 'ASK':
	        res.name = "领取工资中";
	        break;
	    case 'REFUSE_ASK_WAGE':
	        res.name = "拒绝领取工资";
	        break;
	    case 'SIGN_COMPLETE':
	        res.name = "领取完成";
	        break;
	    case 'DEMENSION':
	        res.name = "维权";
	        break;
	    case 'MERCHANT_NO_PROMISE':
	        res.name = "商户爽约";
	        break;
	    default :
	    	res.name = "不能识别";
	    	break;
    }
    return res;
}
//岗位类别
function getPostCategoryStatus(code){
	var res = {};
    res.code = code;
    switch (code) {
	    case 'SEVERAL':
	        res.name = "多天";
	        break;
	    case 'SINGLE':
	        res.name = "单天 ";
	        break;
    }
    return res;
}
//性别
function getSex(code){
	var res = {};
    res.code = code;
    switch (code) {
	    case 'M':
	        res.name = "男";
	        break;
	    case 'W':
	        res.name = "女 ";
	        break;
    }
    return res;
}