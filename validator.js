(function(window) {
	var errorClassName = "tip-error"
	var validator = function(formId,options,errorName) {
		return new validator.prototype.init(formId,options,errorName);
	};
	//展示错误信息,外部不可访问
	function showErrorMsg(element, msg, isSuccess) {
			if(!element) {
				return
			}
			var errorMsg = document.createElement("p");
			errorMsg.innerHTML = msg;
			errorMsg.className = errorClassName
			var errordom = element.parentNode.getElementsByClassName(errorClassName);
			if(errordom && errordom.length) {
				errordom[0].innerHTML = msg
			} else {
				element.parentNode.appendChild(errorMsg)
			}
			return isSuccess;
		}
	    //移除错误信息,外部不可访问
		function removeErrorMsg(element) {
			var errordom = element.parentNode && element.parentNode.getElementsByClassName(errorClassName);
			errordom && errordom.length ? element.parentNode.removeChild(errordom[0]) : ""

		}
		//检查元素是否通过验证，外部可访问
		validator.check = function(element, rule) {
			var name = element.getAttribute("name"),
				value = element.value,
				valid = true;
			for(var index in rule) {
				if(!rule.hasOwnProperty(index)) {
					return;
				}
				if((typeof rule[index]).toLowerCase() != 'object') {//判断是字符串还是对象
					if(!validations[index](value, rule[index])[0]) {
						// 校验失败
						showErrorMsg(element,
							validations[index](value, rule)[1], false);
						return false;
					} else {
						// 校验成功
						removeErrorMsg(element);
					}
				} else {
					if(!validations[index](value, rule[index].value)[0]) {
						// 校验失败
						showErrorMsg(element, rule[index].msg, false);
						return false;
					} else {
						// 校验成功
						removeErrorMsg(element);
					}
				}
			}
			return valid
		}
	validator.prototype = {
		constructor: validator,
		//初始化
		init: function(formId, options, errorName) {
			errorName && (errorClassName = errorName)
			var formDom = document.getElementById(formId);
			if(!formDom || !options) return;
			for(var name in options) {
				if(options.hasOwnProperty(name)) {
					var validEle = formDom.querySelector("[name=" + name + "]");
					if(validEle) {
						var fn = function(e) {
							return validator.check(e.currentTarget, options[name]);
						}
						addEvent(validEle, "change", fn)
						addEvent(validEle, "blur", fn)
						addEvent(validEle, "keyup", fn)
					} else {
						return;
					}
				}
			}
		},
		
	}
	/* 校验规则 */
	validations = {
			required: function(value) {
				return [/^.+$/.test(value.trim()), '不能为空'];
			},
			minLength: function(value, data) {
				return [value.trim().length >= data, '最小长度为' + data + '位'];
			},
			maxLength: function(value, data) {
				return [value.trim().length <= data, '最大长度为' + data + '位'];
			},
			zh: function(value) {
				return [/^[u4E00-u9FA5]+$/.test(value.trim()), '只能为中文字符'];
			},
			zhEn: function(value) {
				return [/[a-zA-Z\u4E00-\u9FA5]+$/.test(value.trim()),
					'只能输入中文字符和英文字符'
				];
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
	
	function addEvent(el, type, fn) {
			if(typeof el.addEventListener != 'undefined') {
				el.addEventListener(type, fn, false);
			} else if(typeof el.attachEvent != 'undefined') {
				el.attachEvent('on' + type, fn);
			} else {
				el['on' + type] = fn;
			};
		};
		
	validator.prototype.init.prototype = validator.prototype;
	window.validator = validator;
})(window);