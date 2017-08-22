

### ���׶���ԭ��js��֤���

����validator(formId,rules,errorClass);
�ɴ���3��������formIdΪform����id�����û��form���ɴ�����֤input����div��id��rulesΪ��֤����errorclassΪ����Ԫ�ص�classnameֵ��


```
var rules = {
	'companyType': {
		required: true
	},
	'inAcctNm': {
		required: true,
		minLength: {
			value: 2,
			msg: '��ʽ����ȷ'
		},
		maxLength: {
			value: 6,
			msg: '��ʽ����ȷ'
		}
	}
}
validator('formId',rules,'error-msg')
/ **companyType��inAcctNm Ϊinput��nameֵ��requiredΪУ����򣬿�ֱ��д�������ͣ�Ҳ����Ϊ����Ϊ����ɴ���value��msg*/
validations = {
			required: function(value) {
				return [/^.+$/.test(value.trim()), '����Ϊ��'];//����Ϊ��
			},
			minLength: function(value, data) {
				return [value.trim().length >= data, '��С����Ϊ' + data + 'λ'];//��С����Ϊ
			},
			maxLength: function(value, data) {
				return [value.trim().length <= data, '��󳤶�Ϊ' + data + 'λ'];//��󳤶�Ϊ
			},
			zh: function(value) {
				return [/^[u4E00-u9FA5]+$/.test(value.trim()), 'ֻ��Ϊ�����ַ�'];//ֻ���������ַ�
			},
			zhEn: function(value) {
				return [/[a-zA-Z\u4E00-\u9FA5]+$/.test(value.trim()),
					'ֻ�����������ַ���Ӣ���ַ�'
				];//�����ַ���Ӣ���ַ�
			},
			zhNum: function(value) {
				return [/[a-zA-Z\d\u4E00-\u9FA5]+$/.test(value.trim()),
					'ֻ��Ϊ�����ַ�������'
				];
			},
			numEn: function(value) {
				return [/[a-zA-Z\d]+$/.test(value.trim()), 'ֻ��Ϊ���ֺ�Ӣ���ַ�'];
			},
			num: function(value) {
				return [/^[\d]+$/.test(value.trim()), '���������֣�'];
			},
			phone: function(value) {
				return [/^1[34578]\d{9}$/.test(value.trim()), '�ֻ��Ÿ�ʽ����ȷ'];
			},
			idCard: function(value) {
				return [/^\d{17}[0-9xX]$/.test(value.trim()), '���֤�Ų���ȷ']
			},
			expiration: function(value) {
				return [/^(\d{6}|[\u4e00-\u9fa5]{2})$/.test(value.trim()), '��ʽ����ȷ'];
			},
			equalTo: function(value, element) {
				return [value === document.getElementById(element), '�����������벻һ��'];
			},
			password: function(value) {
				return [/^[\d\w]+$/.test(value), '��ʹ�ô�Сд��ĸ�����֡��»��ߵ����'];
			},
			notExistsIn: function(value, data) {
				for(var i = 0; i < data.length; i++) {
					if(value === data[i]) return [false];
				}
				return [true];
			}
	}
```
