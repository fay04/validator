

### 简单易懂的原生js验证插件

调用validator(formId,rules,errorClass);
可传入3个参数，formId为form表单的id，如果没有form，可传入验证input外层的div的id，rules为验证规则，errorclass为错误元素的classname值。


```
var rules = {
	'companyType': {
		required: true
	},
	'inAcctNm': {
		required: true,
		minLength: {
			value: 2,
			msg: '格式不正确'
		},
		maxLength: {
			value: 6,
			msg: '格式不正确'
		}
	}
}
validator('formId',rules,'error-msg')
/ **companyType和inAcctNm 为input的name值，required为校验规则，可直接写基本类型，也可以为对象，为对象可传入value和msg*/
validations = {
			required: function(value) {
				return [/^.+$/.test(value.trim()), '不能为空'];//不能为空
			},
			minLength: function(value, data) {
				return [value.trim().length >= data, '最小长度为' + data + '位'];//最小长度为
			},
			maxLength: function(value, data) {
				return [value.trim().length <= data, '最大长度为' + data + '位'];//最大长度为
			},
			zh: function(value) {
				return [/^[u4E00-u9FA5]+$/.test(value.trim()), '只能为中文字符'];//只能是中文字符
			},
			zhEn: function(value) {
				return [/[a-zA-Z\u4E00-\u9FA5]+$/.test(value.trim()),
					'只能输入中文字符和英文字符'
				];//中文字符和英文字符
			},
			zhNum: function(value) {
				return [/[a-zA-Z\d\u4E00-\u9FA5]+$/.test(value.trim()),
					'只能为中文字符和数字'
				];
			},
			numEn: function(value) {
				return [/[a-zA-Z\d]+$/.test(value.trim()), '只能为数字和英文字符'];
			},
			num: function(value) {
				return [/^[\d]+$/.test(value.trim()), '请输入数字！'];
			},
			phone: function(value) {
				return [/^1[34578]\d{9}$/.test(value.trim()), '手机号格式不正确'];
			},
			idCard: function(value) {
				return [/^\d{17}[0-9xX]$/.test(value.trim()), '身份证号不正确']
			},
			expiration: function(value) {
				return [/^(\d{6}|[\u4e00-\u9fa5]{2})$/.test(value.trim()), '格式不正确'];
			},
			equalTo: function(value, element) {
				return [value === document.getElementById(element), '两次输入密码不一致'];
			},
			password: function(value) {
				return [/^[\d\w]+$/.test(value), '请使用大小写字母、数字、下划线的组合'];
			},
			notExistsIn: function(value, data) {
				for(var i = 0; i < data.length; i++) {
					if(value === data[i]) return [false];
				}
				return [true];
			}
	}
```
