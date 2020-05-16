import os

class args:
    ########## Country ###########
    countryNumber = 236
    countryName_cn = ['阿鲁巴', '阿富汗', '安哥拉', '安圭拉', '阿尔巴尼亚', '安道尔', '库拉索（荷）', '阿联酋', '阿根廷', '亚美尼亚', '美属萨摩亚', '南极洲', '法属南部领地', '安提瓜和巴布达', '澳大利亚', '奥地利', '阿塞拜疆', '布隆迪', '比利时', '贝宁', '布基纳法索', '孟加拉国', '保加利亚', '巴林', '巴哈马', '波黑', '白俄罗斯', '伯利兹', '百慕大', '玻利维亚', '巴西', '巴巴多斯', '文莱', '不丹', '布维岛', '博茨瓦纳', '中非', '加拿大', '科科斯群岛（澳）', '瑞士', '智利', '中国', '科特迪瓦', '喀麦隆', '刚果民主共和国', '刚果', '库克群岛', '哥伦比亚', '科摩罗', '佛得角', '哥斯达黎加', '古巴', '圣诞岛（澳）', '开曼群岛', '塞浦路斯', '捷克', '德国', '吉布提', '多米尼克', '丹麦', '多米尼加', '阿尔及利亚', '厄瓜多尔', '埃及', '厄立特里亚', '西撒哈拉', '西班牙', '爱沙尼亚', '埃塞俄比亚', '芬兰', '斐济', '马尔维纳斯群岛', '法国', '法罗群岛', '密克罗尼西亚联邦', '加蓬', '英国', '格鲁吉亚', '加纳', '直布罗陀', '几内亚', '瓜德罗普', '冈比亚', '几内亚比绍', '赤道几内亚', '希腊', '格林纳达', '格陵兰（丹）', '危地马拉', '法属圭亚那', '圭亚那', '赫德岛和麦克唐纳岛', '洪都拉斯', '克罗地亚', '海地', '匈牙利', '印度尼西亚', '印度', '英属印度洋领地', '爱尔兰', '伊朗', '伊拉克', '冰岛', '以色列', '意大利', '牙买加', '约旦', '日本', '哈萨克斯坦', '肯尼亚', '吉尔吉斯斯坦', '柬埔寨', '基里巴斯', '圣基茨和尼维斯', '韩国', '科威特', '老挝', '黎巴嫩', '利比里亚', '利比亚', '圣卢西亚', '列支敦士登', '斯里兰卡', '莱索托', '立陶宛', '卢森堡', '拉脱维亚', '摩洛哥', '摩纳哥', '摩尔多瓦', '马达加斯加', '马尔代夫', '墨西哥', '马绍尔群岛', '前南马其顿', '马里', '马耳他', '缅甸', '黑山共和国', '蒙古', '北马里亚纳', '莫桑比克', '毛里塔尼亚', '蒙特塞拉特', '马提尼克', '毛里求斯', '马拉维', '马来西亚', '马约特', '纳米比亚', '新喀里多尼亚', '尼日尔', '诺福克岛（澳）', '尼日利亚', '尼加拉瓜', '纽埃', '荷兰', '挪威', '尼泊尔', '瑙鲁', '新西兰', '阿曼', '巴基斯坦', '巴拿马', '皮特凯恩', '秘鲁', '菲律宾', '帕劳', '巴布亚新几内亚', '波兰', '波多黎各', '朝鲜', '葡萄牙', '巴拉圭', '法属玻利尼西亚', '卡塔尔', '留尼汪', '罗马尼亚', '俄罗斯联邦', '卢旺达', '沙特阿拉伯', '苏丹', '塞内加尔', '爱德华王子岛', '新加坡', '南乔治亚岛和南桑德韦奇岛', '圣赫勒拿', '斯瓦尔巴岛和扬马延岛', '所罗门群岛', '塞拉利昂', '萨尔瓦多', '圣马力诺', '索马里', '圣皮埃尔和密克隆', '塞尔维亚', '南苏丹', '圣多美和普林西比', '苏里南', '斯洛伐克', '斯洛文尼亚', '瑞典', '斯威士兰', '塞舌尔', '叙利亚', '特克斯和凯科斯群岛', '乍得', '多哥', '泰国', '塔吉克斯坦', '托克劳', '土库曼斯坦', '东帝汶', '汤加', '特立尼达和多巴哥', '突尼斯', '土耳其', '图瓦卢', '坦桑尼亚', '乌干达', '乌克兰', '乌拉圭', '美国', '乌兹别克斯坦', '梵蒂冈', '圣文森特和格林纳丁斯', '委内瑞拉', '英属维尔京群岛', '美属维尔京群岛', '越南', '瓦努阿图', '瓦利斯和富图纳', '萨摩亚', '也门', '南非', '赞比亚', '津巴布韦']
    countryName_en = ['Aruba', 'Afghanistan', 'Angola', 'Anguilla', 'Albania', 'Andorra', 'Curacao (neth.)', 'United Arab Emirates', 'Argentina', 'Armenia', 'American Samoa', 'Antarctica', 'French Southern Territories', 'Antigua and Barbuda', 'Australia', 'Austria', 'Azerbaijan', 'Burundi', 'Belgium', 'Benin', 'Burkina Faso', 'Bangladesh', 'Bulgaria', 'Bahrain', 'Bahamas', 'Bosnia and Herzegovina', 'Belarus', 'Belize', 'Bermuda', 'Bolivia', 'Brazil', 'Barbados', 'Brunei', 'Bhutan', 'Bouvet Island', 'Botswana', 'Central Africa', 'Canada', 'Cocos Islands (aus.)', 'Switzerland', 'Chile', 'China', 'Cote D’ivoire', 'Cameroon', 'D.r.congo', 'Congo', 'Cook Islands', 'Colombia', 'Comoros', 'Cape Verde', 'Costa Rica', 'Cuba', 'Christmas Island (aus.)', 'Cayman Islands', 'Cyprus', 'Czech Republic', 'Germany', 'Djibouti', 'Dominica', 'Denmark', 'Dominican Republic', 'Algeria', 'Ecuador', 'Egypt', 'Eritrea', 'Western Sahara', 'Spain', 'Estonia', 'Ethiopia', 'Finland', 'Fiji', 'Is.Malvinas', 'France', 'Faroe Islands', 'Micronesia', 'Gabon', 'United Kingdom', 'Georgia', 'Ghana', 'Gibraltar', 'Guinea', 'Guadeloupe', 'Gambia', 'Guinea-Bissau', 'Equatorial Guinea', 'Greece', 'Grenada', 'Greenland (den.)', 'Guatemala', 'French Guiana', 'Guyana', 'Heard Island and Mcdonald Islands', 'Honduras', 'Croatia', 'Haiti', 'Hungary', 'Indonesia', 'India', 'British Indian Ocean Territory', 'Ireland', 'Iran', 'Iraq', 'Iceland', 'Israel', 'Italy', 'Jamaica', 'Jordan', 'Japan', 'Kazakhstan', 'Kenya', 'Kyrgyzstan', 'Cambodia', 'Kiribati', 'St.Kitts and Nevis', 'Korea', 'Kuwait', 'Laos', 'Lebanon', 'Liberia', 'Libya', 'St. Lucia', 'Liechtenstein', 'Srilanka', 'Lesotho', 'Lithuania', 'Letzebuerg', 'Latvia', 'Morocco', 'Monaco', 'Moldova', 'Madagascar', 'Maldives', 'Mexico', 'Marshall Islands', 'Macedonia MK ', 'Mali', 'Malta', 'Myanmar', 'Montenegro', 'Mongolia', 'Northern Mariana Islands', 'Mozambique', 'Mauritania', 'Montserrat', 'Martinique', 'Mauritius', 'Malawi', 'Malaysia', 'Mayotte', 'Namibia', 'New Caledonia', 'Niger', 'Norfolk Island (aus.)', 'Nigeria', 'Nicaragua', 'Niue', 'Netherlands', 'Norway', 'Nepal', 'Nauru', 'New Zealand', 'Oman', 'Pakistan', 'Panama', 'Pitcairn', 'Peru', 'Philippines', 'Palau', 'Papua New Guinea', 'Poland', 'Puerto Rico', "Democratic People's Republic of Korea", 'Portugal', 'Paraguay', 'French Polynesia', 'Qatar', 'Reunion', 'Romania', 'Russian Federation', 'Rwanda', 'Saudi Arabia', 'Sudan', 'Senegal', 'Prince Edward Island', 'Singapore', 'South Georgia and the South Sandwich Islands', 'Saint Helena', 'Svalbard and Jan Mayen', 'Solomon Islands', 'Sierra Leone', 'El Salvador', 'San Marino', 'Somalia', 'Saint Pierre and Miquelon', 'Serbia', 'South Sudan', 'Sao Tome and Principe', 'Suriname', 'Slovakia', 'Slovenia', 'Sweden', 'Swaziland', 'Seychelles', 'Syria', 'Turks and Caicos Islands', 'Chad', 'Togo', 'Thailand', 'Tajikistan', 'Tokelau', 'Turkmenistan', 'East Timor', 'Tonga', 'Trinidad and Tobago', 'Tunisia', 'Turkey', 'Tuvalu', 'Tanzania', 'Uganda', 'Ukraine', 'Uruguay', 'United States', 'Uzbekistan', 'Vatican city', 'Saint Vincent and the Grenadines', 'Venezuela', 'Virgin Islands（u.k.）', 'Virgin Islands,u.s.', 'Vietnam', 'Vanuatu', 'Wallis and Futuna', 'Samoa', 'Yemen', 'South Africa', 'Zambia', 'Zimbabwe']
    # From Original Data Index to Map Data Index
    transDict = {114: 0, 107: 1, 184: 2, 14: 3, 147: 4, 228: 5, 166: 6, 111: 7, 160: 8, 32: 9, 139: 10, 174: 11, 207: 12, 97: 13, 96: 14, 158: 15, 122: 16, 33: 17, 131: 18, 21: 19, 176: 20, 221: 21, 37: 22, 132: 23, 30: 24, 62: 25, 60: 26, 8: 27, 40: 28, 47: 29, 165: 30, 50: 31, 173: 32, 163: 33, 29: 34, 105: 35, 92: 36, 51: 37, 90: 38, 224: 39, 104: 40, 56: 41, 72: 42, 15: 43, 93: 44, 76: 45, 178: 46, 66: 47, 18: 48, 59: 49, 67: 50, 77: 51, 85: 52, 134: 53, 157: 54, 177: 55, 69: 56, 103: 57, 200: 58, 39: 59, 26: 60, 124: 61, 156: 62, 191: 63, 16: 64, 99: 65, 128: 66, 55: 67, 102: 68, 9: 69, 125: 70, 172: 71, 5: 72, 126: 73, 169: 74, 219: 75, 25: 76, 95: 77, 199: 78, 79: 79, 121: 80, 194: 81, 223: 82, 198: 83, 136: 84, 22: 85, 129: 86, 73: 87, 4: 88, 54: 89, 215: 91, 100: 93, 7: 94, 23: 95, 115: 96, 161: 97, 162: 98, 1: 99, 63: 100, 101: 101, 117: 102, 175: 103, 106: 104, 127: 105, 180: 106, 214: 107, 89: 111, 144: 112, 61: 113, 153: 114, 182: 115, 43: 116, 233: 117, 206: 118, 20: 119, 45: 137, 42: 121, 170: 122, 225: 123, 68: 124, 81: 125, 80: 126, 82: 127, 75: 128, 53: 129, 109: 130, 181: 131, 213: 132, 13: 133, 108: 134, 149: 135, 84: 136, 142: 138, 201: 139, 36: 140, 148: 141, 179: 142, 220: 143, 222: 144, 197: 145, 88: 146, 202: 147, 227: 150, 0: 151, 24: 152, 192: 153, 217: 154, 19: 155, 11: 156, 138: 157, 110: 158, 145: 159, 31: 160, 234: 161, 87: 162, 57: 163, 28: 164, 150: 165, 205: 166, 154: 167, 151: 168, 70: 169, 190: 170, 94: 171, 168: 173, 235: 174, 49: 175, 41: 176, 130: 177, 2: 178, 64: 179, 218: 180, 86: 181, 141: 182, 203: 183, 27: 184, 58: 185, 78: 186, 116: 188, 119: 189, 6: 190, 143: 194, 83: 195, 135: 196}

    centerDict = {0: {'lon': -69.968338, 'lat': 12.5211}, 1: {'lon': 67.709953, 'lat': 33.9391}, 2: {'lon': 17.873887, 'lat': -11.20269}, 3: {'lon': -63.068615, 'lat': 18.22055}, 4: {'lon': 20.168331, 'lat': 41.15333}, 5: {'lon': 1.601554, 'lat': 42.54624}, 6: {'lon': -68.933, 'lat': 12.1}, 7: {'lon': 53.847818, 'lat': 23.42407}, 8: {'lon': -63.616672, 'lat': -38.41609}, 9: {'lon': 45.038189, 'lat': 40.06909}, 10: {'lon': -170.132217, 'lat': -14.27097}, 11: {'lon': -0.071389, 'lat': -75.25097}, 12: {'lon': 69.348557, 'lat': -49.28036}, 13: {'lon': -61.796428, 'lat': 17.06081}, 14: {'lon': 133.775136, 'lat': -25.27439}, 15: {'lon': 14.550072, 'lat': 47.51623}, 16: {'lon': 47.576927, 'lat': 40.1431}, 17: {'lon': 29.918886, 'lat': -3.37305}, 18: {'lon': 4.469936, 'lat': 50.50388}, 19: {'lon': 2.315834, 'lat': 9.3076}, 20: {'lon': -1.561593, 'lat': 12.23833}, 21: {'lon': 90.356331, 'lat': 23.68499}, 22: {'lon': 25.48583, 'lat': 42.73388}, 23: {'lon': 50.637772, 'lat': 25.93041}, 24: {'lon': -77.39628, 'lat': 25.0342}, 25: {'lon': 17.679076, 'lat': 43.91588}, 26: {'lon': 27.953389, 'lat': 53.7098}, 27: {'lon': -88.49765, 'lat': 17.18987}, 28: {'lon': -64.75737, 'lat': 32.32138}, 29: {'lon': -63.588653, 'lat': -16.29015}, 30: {'lon': -51.92528, 'lat': -14.235}, 31: {'lon': -59.543198, 'lat': 13.19388}, 32: {'lon': 114.727669, 'lat': 4.53527}, 33: {'lon': 90.433601, 'lat': 27.51416}, 34: {'lon': 3.413194, 'lat': -54.42319}, 35: {'lon': 24.684866, 'lat': -22.32847}, 36: {'lon': 20.939444, 'lat': 6.61111}, 37: {'lon': -106.346771, 'lat': 56.13036}, 38: {'lon': 96.870956, 'lat': -12.16416}, 39: {'lon': 8.227512, 'lat': 46.81818}, 40: {'lon': -71.542969, 'lat': -35.67514}, 41: {'lon': 104.195397, 'lat': 35.8616}, 42: {'lon': -5.54708, 'lat': 7.53998}, 43: {'lon': 12.354722, 'lat': 7.36972}, 44: {'lon': 21.758664, 'lat': -4.03833}, 45: {'lon': 15.827659, 'lat': -0.22802}, 46: {'lon': -159.777671, 'lat': -21.23673}, 47: {'lon': -74.297333, 'lat': 4.57086}, 48: {'lon': 43.872219, 'lat': -11.875}, 49: {'lon': -24.013197, 'lat': 16.00208}, 50: {'lon': -83.753428, 'lat': 9.74891}, 51: {'lon': -77.781167, 'lat': 21.52175}, 52: {'lon': 105.690449, 'lat': -10.44752}, 53: {'lon': -80.566956, 'lat': 19.51346}, 54: {'lon': 33.429859, 'lat': 35.12641}, 55: {'lon': 15.472962, 'lat': 49.81749}, 56: {'lon': 10.451526, 'lat': 51.16569}, 57: {'lon': 42.590275, 'lat': 11.82513}, 58: {'lon': -61.370976, 'lat': 15.41499}, 59: {'lon': 9.501785, 'lat': 56.2639}, 60: {'lon': -70.162651, 'lat': 18.73569}, 61: {'lon': 1.659626, 'lat': 28.03388}, 62: {'lon': -78.183406, 'lat': -1.83123}, 63: {'lon': 30.802498, 'lat': 26.82055}, 64: {'lon': 39.782334, 'lat': 15.17938}, 65: {'lon': -12.885834, 'lat': 24.21552}, 66: {'lon': -3.74922, 'lat': 40.46366}, 67: {'lon': 25.013607, 'lat': 58.59527}, 68: {'lon': 40.489673, 'lat': 9.14}, 69: {'lon': 25.748151, 'lat': 61.9241}, 70: {'lon': 179.414413, 'lat': -16.57819}, 71: {'lon': -59.523613, 'lat': -51.79625}, 72: {'lon': 2.213749, 'lat': 46.22763}, 73: {'lon': -6.911806, 'lat': 61.89263}, 74: {'lon': 150.550812, 'lat': 7.42555}, 75: {'lon': 11.609444, 'lat': -0.80368}, 76: {'lon': -3.435973, 'lat': 55.37805}, 77: {'lon': 43.356892, 'lat': 42.3154}, 78: {'lon': -1.023194, 'lat': 7.94652}, 79: {'lon': -5.345374, 'lat': 36.13774}, 80: {'lon': -9.696645, 'lat': 9.94558}, 81: {'lon': -62.067641, 'lat': 16.99597}, 82: {'lon': -15.310139, 'lat': 13.44318}, 83: {'lon': -15.180413, 'lat': 11.80374}, 84: {'lon': 10.267895, 'lat': 1.6508}, 85: {'lon': 21.824312, 'lat': 39.0742}, 86: {'lon': -61.604171, 'lat': 12.26277}, 87: {'lon': -42.604303, 'lat': 71.70693}, 88: {'lon': -90.230759, 'lat': 15.78347}, 89: {'lon': -53.125782, 'lat': 3.93388}, 90: {'lon': -58.93018, 'lat': 4.86041}, 91: {'lon': 73.504158, 'lat': -53.0818}, 92: {'lon': -86.241905, 'lat': 15.19999}, 93: {'lon': 15.2, 'lat': 45.0}, 94: {'lon': -72.285215, 'lat': 18.97118}, 95: {'lon': 19.503304, 'lat': 47.16249}, 96: {'lon': 113.921327, 'lat': -0.78927}, 97: {'lon': 78.96288, 'lat': 20.59368}, 98: {'lon': 71.876519, 'lat': -6.34319}, 99: {'lon': -8.24389, 'lat': 53.4129}, 100: {'lon': 53.688046, 'lat': 32.4279}, 101: {'lon': 43.679291, 'lat': 33.22319}, 102: {'lon': -19.020835, 'lat': 64.96305}, 103: {'lon': 34.851612, 'lat': 31.04605}, 104: {'lon': 12.56738, 'lat': 41.8719}, 105: {'lon': -77.297508, 'lat': 18.10958}, 106: {'lon': 36.238414, 'lat': 30.58516}, 107: {'lon': 138.252924, 'lat': 36.20482}, 108: {'lon': 66.923684, 'lat': 48.01957}, 109: {'lon': 37.906193, 'lat': -0.02355}, 110: {'lon': 74.766098, 'lat': 41.2043}, 111: {'lon': 104.990963, 'lat': 12.56567}, 112: {'lon': -168.734039, 'lat': -3.37041}, 113: {'lon': -62.782998, 'lat': 17.35782}, 114: {'lon': 127.766922, 'lat': 35.90775}, 115: {'lon': 47.481766, 'lat': 29.3116}, 116: {'lon': 102.495496, 'lat': 19.8562}, 117: {'lon': 35.862285, 'lat': 33.85472}, 118: {'lon': -9.429499, 'lat': 6.42805}, 119: {'lon': 17.228331, 'lat': 26.335}, 120: {'lon': -60.978893, 'lat': 13.90944}, 121: {'lon': 9.555373, 'lat': 47.16}, 122: {'lon': 80.771797, 'lat': 7.87305}, 123: {'lon': 28.233608, 'lat': -29.60998}, 124: {'lon': 23.881275, 'lat': 55.16943}, 125: {'lon': 6.129583, 'lat': 49.81527}, 126: {'lon': 24.603189, 'lat': 56.87963}, 127: {'lon': -7.09262, 'lat': 31.7917}, 128: {'lon': 7.412841, 'lat': 43.75029}, 129: {'lon': 28.369885, 'lat': 47.41163}, 130: {'lon': 46.869107, 'lat': -18.76694}, 131: {'lon': 73.22068, 'lat': 3.20277}, 132: {'lon': -102.552784, 'lat': 23.6345}, 133: {'lon': 171.184478, 'lat': 7.13147}, 134: {'lon': 21.745275, 'lat': 41.60863}, 135: {'lon': -3.996166, 'lat': 17.57069}, 136: {'lon': 14.375416, 'lat': 35.93749}, 137: {'lon': 95.956223, 'lat': 21.91396}, 138: {'lon': 19.37439, 'lat': 42.70867}, 139: {'lon': 103.846656, 'lat': 46.86249}, 140: {'lon': 145.38469, 'lat': 17.3308}, 141: {'lon': 35.529562, 'lat': -18.66569}, 142: {'lon': -10.940835, 'lat': 21.0078}, 143: {'lon': -62.187366, 'lat': 16.74249}, 144: {'lon': -61.024174, 'lat': 14.64152}, 145: {'lon': 57.552152, 'lat': -20.3484}, 146: {'lon': 34.301525, 'lat': -13.2543}, 147: {'lon': 101.975766, 'lat': 4.21048}, 148: {'lon': 45.166244, 'lat': -12.827}, 149: {'lon': 18.49041, 'lat': -22.9576}, 150: {'lon': 165.618042, 'lat': -20.9043}, 151: {'lon': 8.081666, 'lat': 17.60778}, 152: {'lon': 167.954712, 'lat': -29.04083}, 153: {'lon': 8.675277, 'lat': 9.08199}, 154: {'lon': -85.207229, 'lat': 12.86541}, 155: {'lon': -169.867233, 'lat': -19.05444}, 156: {'lon': 5.291266, 'lat': 52.13263}, 157: {'lon': 8.468946, 'lat': 60.47202}, 158: {'lon': 84.124008, 'lat': 28.39485}, 159: {'lon': 166.931503, 'lat': -0.52277}, 160: {'lon': 174.885971, 'lat': -40.90055}, 161: {'lon': 55.923255, 'lat': 21.51258}, 162: {'lon': 69.345116, 'lat': 30.37532}, 163: {'lon': -80.782127, 'lat': 8.53798}, 164: {'lon': -127.439308, 'lat': -24.70361}, 165: {'lon': -75.015152, 'lat': -9.18996}, 166: {'lon': 121.774017, 'lat': 12.87972}, 167: {'lon': 134.58252, 'lat': 7.5149}, 168: {'lon': 143.95555, 'lat': -6.31499}, 169: {'lon': 19.145136, 'lat': 51.91943}, 170: {'lon': -66.590149, 'lat': 18.22083}, 171: {'lon': 127.510093, 'lat': 40.33985}, 172: {'lon': -8.224454, 'lat': 39.39987}, 173: {'lon': -58.443832, 'lat': -23.4425}, 174: {'lon': -149.406843, 'lat': -17.67974}, 175: {'lon': 51.183884, 'lat': 25.35482}, 176: {'lon': 55.536384, 'lat': -21.11514}, 177: {'lon': 24.96676, 'lat': 45.94316}, 178: {'lon': 105.318756, 'lat': 61.524}, 179: {'lon': 29.873888, 'lat': -1.94027}, 180: {'lon': 45.079162, 'lat': 23.88594}, 181: {'lon': 30.217636, 'lat': 12.8628}, 182: {'lon': -14.452362, 'lat': 14.4974}, 183: {'lon': -63, 'lat': 46.3}, 184: {'lon': 103.819836, 'lat': 1.35208}, 185: {'lon': -36.587909, 'lat': -54.42957}, 186: {'lon': -10.030696, 'lat': -24.14347}, 187: {'lon': 23.670272, 'lat': 77.5536}, 188: {'lon': 160.156194, 'lat': -9.6457}, 189: {'lon': -11.779889, 'lat': 8.46055}, 190: {'lon': -88.89653, 'lat': 13.79418}, 191: {'lon': 12.457777, 'lat': 43.9423}, 192: {'lon': 46.199616, 'lat': 5.15214}, 193: {'lon': -56.27111, 'lat': 46.94193}, 194: {'lon': 21.005859, 'lat': 44.01652}, 195: {'lon': 31.6, 'lat': 4.85}, 196: {'lon': 6.613081, 'lat': 0.1863}, 197: {'lon': -56.027783, 'lat': 3.9193}, 198: {'lon': 19.699024, 'lat': 48.66902}, 199: {'lon': 14.995463, 'lat': 46.15124}, 200: {'lon': 18.643501, 'lat': 60.12816}, 201: {'lon': 31.465866, 'lat': -26.5225}, 202: {'lon': 55.491977, 'lat': -4.67957}, 203: {'lon': 38.996815, 'lat': 34.80207}, 204: {'lon': -71.797928, 'lat': 21.69402}, 205: {'lon': 18.732207, 'lat': 15.45416}, 206: {'lon': 0.824782, 'lat': 8.61954}, 207: {'lon': 100.992541, 'lat': 15.87003}, 208: {'lon': 71.276093, 'lat': 38.86103}, 209: {'lon': -171.855881, 'lat': -8.96736}, 210: {'lon': 59.556278, 'lat': 38.96971}, 211: {'lon': 125.35, 'lat': -8.35}, 212: {'lon': -175.198242, 'lat': -21.17898}, 213: {'lon': -61.222503, 'lat': 10.6918}, 214: {'lon': 9.537499, 'lat': 33.88691}, 215: {'lon': 35.243322, 'lat': 38.96374}, 216: {'lon': 177.64933, 'lat': -7.10953}, 217: {'lon': 34.888822, 'lat': -6.36902}, 218: {'lon': 32.290275, 'lat': 1.37333}, 219: {'lon': 31.16558, 'lat': 48.37943}, 220: {'lon': -55.765835, 'lat': -32.52277}, 221: {'lon': -95.712891, 'lat': 37.0902}, 222: {'lon': 64.585262, 'lat': 41.37749}, 223: {'lon': 12.453389, 'lat': 41.90291}, 224: {'lon': -61.287228, 'lat': 12.9843}, 225: {'lon': -66.58973, 'lat': 6.4237}, 226: {'lon': -64.639968, 'lat': 18.42069}, 227: {'lon': -64.896335, 'lat': 18.33576}, 228: {'lon': 108.277199, 'lat': 14.05832}, 229: {'lon': 166.959158, 'lat': -15.3767}, 230: {'lon': -177.156097, 'lat': -13.76875}, 231: {'lon': -172.104629, 'lat': -13.75902}, 232: {'lon': 48.516388, 'lat': 15.55272}, 233: {'lon': 22.937506, 'lat': -30.55948}, 234: {'lon': 27.849332, 'lat': -13.13389}, 235: {'lon': 29.154857, 'lat': -19.01543}}
    
    
    ############### China ###############
    cityName = ['北京', '天津', '河北', '山西', '内蒙古', '辽宁', '吉林', '黑龙江', '上海', '江苏', '浙江', '安徽', '福建', '江西', '山东', '河南', '湖北', '湖南', '广东', '广西', '海南', '重庆', '四川', '贵州', '云南', '西藏', '陕西', '甘肃', '青海', '宁夏', '新疆', '台湾', '香港', '澳门']
    
    map2Data = {'北京市': '北京', '天津市': '天津', '河北省': '河北', '山西省': '山西', '内蒙古自治区': '内蒙古', '辽宁省': '辽宁', '吉林省': '吉林', '黑龙江省': '黑龙江', '上海市': '上海', '江苏省': '江苏', '浙江省': '浙江', '安徽省': '安徽', '福建省': '福建', '江西省': '江西', '山东省': '山东', '河南省': '河南', '湖北省': '湖北', '湖南省': '湖南', '广东省': '广东', '广西壮族自治区': '广西', '海南省': '海南', '重庆市': '重庆', '四川省': '四川', '贵州省': '贵州', '云南省': '云南', '西藏自治区': '西藏', '陕西省': '陕西', '甘肃省': '甘肃', '青海省': '青海', '宁夏回族自治区': '宁夏', '新疆维吾尔自治区': '新疆', '台湾省': '台湾', '香港特别行政区': '香港', '澳门特别行政区': '澳门'}
    data2Map = {'北京': '北京市', '天津': '天津市', '河北': '河北省', '山西': '山西省', '内蒙古': '内蒙古自治区', '辽宁': '辽宁省', '吉林': '吉林省', '黑龙江': '黑龙江省', '上海': '上海市', '江苏': '江苏省', '浙江': '浙江省', '安徽': '安徽省', '福建': '福建省', '江西': '江西省', '山东': '山东省', '河南': '河南省', '湖北': '湖北省', '湖南': '湖南省', '广东': '广东省', '广西': '广西壮族自治区', '海南': '海南省', '重庆': '重庆市', '四川': '四川省', '贵州': '贵州省', '云南': '云南省', '西藏': '西藏自治区', '陕西': '陕西省', '甘肃': '甘肃省', '青海': '青海省', '宁夏': '宁夏回族自治区', '新疆': '新疆维吾尔自治区', '台湾': '台湾省', '香港': '香港特别行政区', '澳门': '澳门特别行政区'}
    provinceCenter = {'北京市': {'lon': 116.405285, 'lat': 39.904989}, '天津市': {'lon': 117.190182, 'lat': 39.125596}, '河北省': {'lon': 114.502461, 'lat': 38.045474}, '山西省': {'lon': 112.549248, 'lat': 37.857014}, '内蒙古自治区': {'lon': 111.670801, 'lat': 40.818311}, '辽宁省': {'lon': 123.429096, 'lat': 41.796767}, '吉林省': {'lon': 125.3245, 'lat': 43.886841}, '黑龙江省': {'lon': 126.642464, 'lat': 45.756967}, '上海市': {'lon': 121.472644, 'lat': 31.231706}, '江苏省': {'lon': 118.767413, 'lat': 32.041544}, '浙江省': {'lon': 120.153576, 'lat': 30.287459}, '安徽省': {'lon': 117.283042, 'lat': 31.86119}, '福建省': {'lon': 119.306239, 'lat': 26.075302}, '江西省': {'lon': 115.892151, 'lat': 28.676493}, '山东省': {'lon': 117.000923, 'lat': 36.675807}, '河南省': {'lon': 113.665412, 'lat': 34.757975}, '湖北省': {'lon': 114.298572, 'lat': 30.584355}, '湖南省': {'lon': 112.982279, 'lat': 28.19409}, '广东省': {'lon': 113.280637, 'lat': 23.125178}, '广西壮族自治区': {'lon': 108.320004, 'lat': 22.82402}, '海南省': {'lon': 110.33119, 'lat': 20.031971}, '重庆市': {'lon': 106.504962, 'lat': 29.533155}, '四川省': {'lon': 104.065735, 'lat': 30.659462}, '贵州省': {'lon': 106.713478, 'lat': 26.578343}, '云南省': {'lon': 102.712251, 'lat': 25.040609}, '西藏自治区': {'lon': 91.132212, 'lat': 29.660361}, '陕西省': {'lon': 108.948024, 'lat': 34.263161}, '甘肃省': {'lon': 103.823557, 'lat': 36.058039}, '青海省': {'lon': 101.778916, 'lat': 36.623178}, '宁夏回族自治区': {'lon': 106.278179, 'lat': 38.46637}, '新疆维吾尔自治区': {'lon': 87.617733, 'lat': 43.792818}, "台湾省":{"lon":121.509062,"lat":25.044332},"香港特别行政区":{"lon":114.173355,"lat":22.320048} , "澳门特别行政区":{"lon":113.54909,"lat":22.198951}}
    provinceEn2Cn = {'Hubei': '湖北', 'Guangdong': '广东', 'Zhejiang': '浙江', 'Henan': '河南', 'Chongqing': '重庆', 'Hunan': '湖南', 'Beijing': '北京', 'Anhui': '安徽', 'Shandong': '山东', 'Sichuan': '四川', 'Shanghai': '上海', 'Guangxi': '广西', 'Jiangxi': '江西', 'Fujian': '福建', 'Jiangsu': '江苏', 'Hainan': '海南', 'Shannxi': '陕西', 'Liaoning': '辽宁', 'Heilongjiang': '黑龙江', 'Tianjin': '天津', 'Hebei': '河北', 'Yunnan': '云南', 'Shanxi': '山西', 'Inner Mongolia': '内蒙古', 'Gansu': '甘肃', 'Guizhou': '贵州', 'Hongkong, China': '香港', 'Macau, China': '澳门', 'Ningxia': '宁夏', 'Jilin': '吉林', 'Xinjiang': '新疆', 'Taiwan, China': '台湾', 'Qinghai': '青海', 'Tibet': '西藏'}
    provinceCn2En = {'湖北': 'Hubei', '广东': 'Guangdong', '浙江': 'Zhejiang', '河南': 'Henan', '重庆': 'Chongqing', '湖南': 'Hunan', '北京': 'Beijing', '安徽': 'Anhui', '山东': 'Shandong', '四川': 'Sichuan', '上海': 'Shanghai', '广西': 'Guangxi', '江西': 'Jiangxi', '福建': 'Fujian', '江苏': 'Jiangsu', '海南': 'Hainan', '陕西': 'Shannxi', '辽宁': 'Liaoning', '黑龙江': 'Heilongjiang', '天津': 'Tianjin', '河北': 'Hebei', '云南': 'Yunnan', '山西': 'Shanxi', '内蒙古': 'Inner Mongolia', '甘肃': 'Gansu', '贵州': 'Guizhou', '香港': 'Hongkong, China', '澳门': 'Macau, China', '宁夏': 'Ningxia', '吉林': 'Jilin', '新疆': 'Xinjiang', '台湾': 'Taiwan, China', '青海': 'Qinghai', '西藏': 'Tibet'}
    
    ##############################
    startDate = '1.21'
    DatabaseName = ['date', 'country', 'province', 'prov_longitude', 'prov_latitude', 'death_cases', 'confirmed_cases', 'heal_cases', 'days', 'cumulative_confirmed_cases', 'cumulative_death_cases', 'cumulative_heal_cases']
    
    
    
    