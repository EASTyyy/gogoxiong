var province_arr = [];
jQuery.get("/city/street/getProvinces",{},function(data){
	province_arr=data;
});

/**
 * 初始化省市县联动控件
 * @author ChenJunhui
 * @param provinceSelId
 * @param districtSelId
 * @param citySelId
 * @param currentProvinceId 当前省份值 没有不传
 * @param currentdistrictId 当前地区值 没有传不传
 * @param currentCityId 当前城市值没有传不传
 */
function doInitCitySelect(provinceSelId,districtSelId,citySelId,currentProvinceId,currentdistrictId,currentCityId){
	$('#'+provinceSelId).unbind("change");
	$('#'+districtSelId).unbind("change");
	$('#'+citySelId).unbind("change");
	removAlleSelect(provinceSelId);
	var provinceDom = document.getElementById(provinceSelId);
	provinceDom.options[provinceDom.length] = new Option("-选择省份-","");
	for(var i=0;i<province_arr.length;i++){
		provinceDom.options[provinceDom.length] = new Option(province_arr[i].value,province_arr[i].id);
	}
	
	var districtDom = document.getElementById(districtSelId);
	districtDom.options[districtDom.length] = new Option("-选择地区-","");
	var cityDom = document.getElementById(citySelId);
	cityDom.options[cityDom.length] = new Option("-选择县市区-","");
	
	$("#"+provinceSelId).change(function(){
		removAlleSelect(districtSelId);
		districtDom.options[districtDom.length] = new Option("-选择地区-","");
		if($(this).val()!=""){
			jQuery.get("/city/street/getDistricts",{provinceId:$(this).val()},function(data){
				for(var i=0;i<data.length;i++){
					districtDom.options[districtDom.length] = new Option(data[i].value,data[i].id);
				}
				removAlleSelect(citySelId);
				cityDom.options[cityDom.length] = new Option("-选择县市区-","");
			});
		}
	});
	
	$("#"+districtSelId).change(function(){
		removAlleSelect(citySelId);
		if($(this).val()!=""){
			cityDom.options[cityDom.length] = new Option("-选择县市区-","");
			jQuery.get("/city/street/getCitys",{districtId:$(this).val()},function(data){
				for(var i=0;i<data.length;i++){
					cityDom.options[cityDom.length] = new Option(data[i].value,data[i].id);
				}
			});
		}
	});

	if(typeof currentProvinceId!='undefined'){
		provinceDom.value=currentProvinceId;
		jQuery.get("/city/street/getDistricts",{provinceId:currentProvinceId},function(data){
			for(var i=0;i<data.length;i++){
				districtDom.options[districtDom.length] = new Option(data[i].value,data[i].id);
			}
			if(typeof currentdistrictId!='undefined'){
				districtDom.value=currentdistrictId;
				jQuery.get("/city/street/getCitys",{districtId:currentdistrictId},function(data){
					for(var i=0;i<data.length;i++){
						cityDom.options[cityDom.length] = new Option(data[i].value,data[i].id);
					}
					if(typeof currentCityId!='undefined'){
						cityDom.value=currentCityId;
					}
				});
			}
		});
	}
}

function doInitCitySelectTarento(provinceSelId,districtSelId,citySelId,street,community,currentProvinceId,currentdistrictId,currentCityId,currentStreet,currentCommunity){
	$('#'+provinceSelId).unbind("change");
	$('#'+districtSelId).unbind("change");
	$('#'+citySelId).unbind("change");
	$('#'+street).unbind("change");
	$('#'+community).unbind("change");
	removAlleSelect(provinceSelId);
	var provinceDom = document.getElementById(provinceSelId);
	provinceDom.options[provinceDom.length] = new Option("-选择省份-","");
	for(var i=0;i<province_arr.length;i++){
		provinceDom.options[provinceDom.length] = new Option(province_arr[i].value,province_arr[i].id);
	}
	
	var districtDom = document.getElementById(districtSelId);
	districtDom.options[districtDom.length] = new Option("-选择地区-","");
	var cityDom = document.getElementById(citySelId);
	cityDom.options[cityDom.length] = new Option("-选择县市区-","");
	var streetDom = document.getElementById(street);
	streetDom.options[streetDom.length] = new Option("-选择街道-","");
	var communityDom = document.getElementById(community);
	communityDom.options[communityDom.length] = new Option("-选择社区-","");
	
	$("#"+provinceSelId).change(function(){
		removAlleSelect(districtSelId);
		districtDom.options[districtDom.length] = new Option("-选择地区-","");
		if($(this).val()!=""){
			jQuery.get("/city/street/getDistricts",{provinceId:$(this).val()},function(data){
				for(var i=0;i<data.length;i++){
					districtDom.options[districtDom.length] = new Option(data[i].value,data[i].id);
				}
				removAlleSelect(citySelId);
				cityDom.options[cityDom.length] = new Option("-选择县市区-","");
			});
		}
	});
	
	$("#"+districtSelId).change(function(){
		removAlleSelect(citySelId);
		cityDom.options[cityDom.length] = new Option("-选择县市区-","");
		if($(this).val()!=""){
			jQuery.get("/city/street/getCitys",{districtId:$(this).val()},function(data){
				for(var i=0;i<data.length;i++){
					cityDom.options[cityDom.length] = new Option(data[i].value,data[i].id);
				}
			});
		}
	});
	$("#"+citySelId).change(function(){
		removAlleSelect(street);
		streetDom.options[streetDom.length] = new Option("-选择街道-","");
		if($(this).val()!=""){
			jQuery.get("/city/street/getStreets",{cityId:$(this).val()},function(data){
				for(var i=0;i<data.length;i++){
					streetDom.options[streetDom.length] = new Option(data[i].value,data[i].id);
				}
			});
		}
	});
	$("#"+street).change(function(){
		removAlleSelect(community);
		communityDom.options[communityDom.length] = new Option("-选择社区-","");
		if($(this).val()!=""){
			jQuery.get("/city/street/getCommunities",{streetId:$(this).val()},function(data){
				for(var i=0;i<data.length;i++){
					communityDom.options[communityDom.length] = new Option(data[i].value,data[i].id);
				}
			});
		}
	});

	if(typeof currentProvinceId!='undefined' && currentProvinceId.length > 0){
		provinceDom.value=currentProvinceId;
		jQuery.get("/city/street/getDistricts",{provinceId:currentProvinceId},function(data){
			for(var i=0;i<data.length;i++){
				districtDom.options[districtDom.length] = new Option(data[i].value,data[i].id);
			}
			if(typeof currentdistrictId!='undefined'){
				districtDom.value=currentdistrictId;
				jQuery.get("/city/street/getCitys",{districtId:currentdistrictId},function(data){
					for(var i=0;i<data.length;i++){
						cityDom.options[cityDom.length] = new Option(data[i].value,data[i].id);
					}
					if(typeof currentCityId!='undefined'){
						cityDom.value=currentCityId;
						jQuery.get("/city/street/getStreets",{cityId:currentCityId},function(data){
							for(var i=0;i<data.length;i++){
								streetDom.options[streetDom.length] = new Option(data[i].value,data[i].id);
							}
							if(typeof currentStreet!='undefined'){
								streetDom.value=currentStreet;
								jQuery.get("/city/street/getCommunities",{streetId:currentStreet},function(data){
									for(var i=0;i<data.length;i++){
										communityDom.options[communityDom.length] = new Option(data[i].value,data[i].id);
									}
									if(typeof currentCommunity != 'undefined'){
										communityDom.value = currentCommunity;
									}
								});
							}
						});
					}
				});
			}
		});
	}
}