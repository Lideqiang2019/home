// 全球各国的累计患病人数序列，在globalMap上使用
list_1 = "http://121.196.204.146/"
list_2 = "http://10.129.2.158:8080/"


var global_cum_confirmed_head = "http://10.129.2.158:8080/api/v1/query/country/confirmedCases/cumulate?countryName=";
var global_cum_confirmed_tail = "&querydays=60";

// 全球各国的累计患病人数序列
var global_cum = "http://10.129.2.158:8080/api/v1/query/country/confirmedCases/cumulate?";

// 计算模块给的输出
var compute_block_in = "http://10.129.2.157:1234/";

// 全球所有国家最近一天的累计确诊人数
var scatter_global = "http://10.129.2.158:8080/api/v1/query/country/confirmedCases/cumulate/all";

var scatter_china = "http://10.129.2.158:8080/api/v1/query/province/confirmedCases/cumulate/all?countryName=China";

// 最近时间
var latest_date = "http://10.129.2.158:8080/api/v1/query/latestDate";

// 全球累计确诊人数序列
var global_cum_all = "http://10.129.2.158:8080/api/v1/query/world/confirmedCases/cumulate/lists?";