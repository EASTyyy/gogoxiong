/** 
 * 初始化省市县联动控件
 * @author ChenJunhui
 * @param provinceSelId
 * @param citySelId
 * @param districtSelId
 * @param currentProvinceId 当前省份值 没有不传
 * @param currentcityId 当前地区值 没有传不传
 * @param currentdistrictId 当前城市值没有传不传
 * @auto 2015年12月25日自定义。乱改直接往屎里打！！！！！！！！
 */
function doInitCitySelectChint(provinceSelId,citySelId,districtSelId,currentProvinceId,currentcityId,currentdistrictId){
	$('#'+provinceSelId).unbind("change");
	$('#'+citySelId).unbind("change");
	$('#'+districtSelId).unbind("change");
	removAlleSelect(provinceSelId);
	var provinceDom = document.getElementById(provinceSelId);
	provinceDom.options[provinceDom.length] = new Option("-选择省份-","");
	jQuery.get("/chint/area/getProvince",{},function(province_arr){
		for(var i=0;i<province_arr.length;i++){
			provinceDom.options[provinceDom.length] = new Option(province_arr[i].name,province_arr[i].id);
		}
		var cityDom = document.getElementById(citySelId);
		cityDom.options[cityDom.length] = new Option("-选择地区-","");
		var districtDom = document.getElementById(districtSelId);
		districtDom.options[districtDom.length] = new Option("-选择县市区-","");
		
		$("#"+provinceSelId).change(function(){
			removAlleSelect(citySelId);
			cityDom.options[cityDom.length] = new Option("-选择地区-","");
			if($(this).val()!=""){
				jQuery.get("/chint/area/getCity",{provinceId:$(this).val()},function(data){
					for(var i=0;i<data.length;i++){
						cityDom.options[cityDom.length] = new Option(data[i].name,data[i].id);
					}
					removAlleSelect(districtSelId);
					districtDom.options[districtDom.length] = new Option("-选择县市区-","");
				});
			}
		});
		
		$("#"+citySelId).change(function(){
			removAlleSelect(districtSelId);
			if($(this).val()!=""){
				districtDom.options[districtDom.length] = new Option("-选择县市区-","");
				jQuery.get("/chint/area/getDistrict",{cityId:$(this).val()},function(data){
					for(var i=0;i<data.length;i++){
						
						districtDom.options[districtDom.length] = new Option(data[i].name,data[i].id);
					}
				});
			}
		});

		if(typeof currentProvinceId!='undefined'){
			provinceDom.value=currentProvinceId;
			jQuery.get("/chint/area/getCity",{provinceId:currentProvinceId},function(data){
				for(var i=0;i<data.length;i++){
					cityDom.options[cityDom.length] = new Option(data[i].name,data[i].id);
				}
				if(typeof currentcityId!='undefined'){
					cityDom.value=currentcityId;
					jQuery.get("/chint/area/getDistrict",{cityId:currentcityId},function(data){
						for(var i=0;i<data.length;i++){
							districtDom.options[districtDom.length] = new Option(data[i].name,data[i].id);
						}
						if(typeof currentdistrictId!='undefined'){
							districtDom.value=currentdistrictId;
						}
					});
				}
			});
		}
	});
}
