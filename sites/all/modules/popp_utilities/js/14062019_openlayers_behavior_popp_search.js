/**
 * Created by lbodiguel on 23/02/2015.
 */


(function ($) {
    var data;
    var availableNids = [], acceptedNids = [];
    $(document).ready(function(){
        $("#spatialSearch").click(function () {
            if ($(this).hasClass('active')) {
                $(this).removeClass('active');
            } else {
                $(this).addClass('active');
            }
        });
    });

    Drupal.behaviors.openlayers_behavior_popp_search = {
        'attach': function (context, settings) {
            if ($(context).data("openlayers") != undefined) {
                data = $(context).data("openlayers");
                updateAvailableNids();
               
                $("#popp_search_block").on('click', '#searchButton', updateLayers);
                data.openlayers.events.on({
                    "moveend": updateSearchFields
                });
                layers = data.openlayers.getLayersByClass('OpenLayers.Layer.Vector');
                for (var i in layers) {
                    layers[i].strategies[0].createCluster = function (feature) {
                        var count = 0;
                        if (feature.style == null) {
                            count++;
                        }
                        var center = feature.geometry.getBounds().getCenterLonLat();
                        var cluster = new OpenLayers.Feature.Vector(
                            new OpenLayers.Geometry.Point(center.lon, center.lat),
                            {count: count}
                        );
                        cluster.cluster = [feature];
                        return cluster;
                    };
                    layers[i].strategies[0].shouldCluster = function (cluster, feature) {
                        if (feature.style != undefined) {
                            if (feature.style.visibility != undefined) {
                                return false;
                            }
                        }
                        var cc = cluster.geometry.getBounds().getCenterLonLat();
                        var fc = feature.geometry.getBounds().getCenterLonLat();
                        var distance = (
                        Math.sqrt(
                            Math.pow((cc.lon - fc.lon), 2) + Math.pow((cc.lat - fc.lat), 2)
                        ) / this.resolution
                        );
                        return (distance <= this.distance);
                    };
                }
            }
        }
    };

    function array_intersect(arr) {
        if (arr.length < 1) {
            return availableNids;
        }
        var result = arr.shift().filter(function (v) {
            return arr.every(function (a) {
                return a.indexOf(v) !== -1;
            });
        });
        return result;
    }
    
    function array_merge(arr) {
    	result = new Array();
    	 for(var i= 0; i < arr.length; i++)
         {
    		 result = result.concat(arr[i]);
         }
    	 result[1] = new Array();
        return result;
    }


    function updateAvailableNids() {
        availableNids = new Array();
        var layers = data.openlayers.getLayersByClass('OpenLayers.Layer.Vector');
        if (layers.length > 0) {
            for (var i in layers) {
                if (layers[i].features[0] !== undefined) {
                    for (var j in layers[i].features) {
                        if (layers[i].features[j].onScreen()) {
                            if (layers[i].features[j].cluster != undefined) {
                                for (var k in layers[i].features[j].cluster) {
                                    availableNids.push(layers[i].features[j].cluster[k].data.nid);
                                }
                            } else {
                                availableNids.push(layers[i].features[j].data.nid);
                            }

                        }
                    }
                }
            }
        }
        availableNids = $.unique(availableNids);
       
    }

    function saveActualSearch() {
        console.log(availableNids);
        console.log(data.openlayers.getCenter());
        console.log(data.openlayers.getZoom());
        console.log(JSON.stringify($("#poppSearchForm").serializeArray()));
    }

    function updateSearchFields() {
        updateAvailableNids();
        $("#popp_search_block select option").each(function (i, elt) {
            if ($(elt).val() != "") {
                var nids = $(elt).attr('presenton').split(',');
                var toHide = true;
                $(nids).each(function (j, foundNid) {
                    if (availableNids.indexOf(foundNid) != -1) {
                        toHide = false;
                        return;
                    }
                });
                if (toHide) {
                    $(elt).hide();
                } else {
                    $(elt).show();
                }
            }
        });
    }

    function updateLayers(e) {
        if(data.openlayers.popups[0] !== undefined){
            data.openlayers.removePopup(data.openlayers.popups[0]);
        }

        var spatialSearch = $("#spatialSearch").hasClass('active');
        if (spatialSearch) {
            doCenter = false;
        }
        result = new Array();
        
        
        $("#advancedSearchModal input, #advancedSearchModal option").each(function (i, elt) {
            if (($(elt).prop('selected') || $(elt).prop('checked')) && $(elt).val() != '') {
            	 var tab = $(elt).attr('presenton').split(',');
                 result.push(tab);
            }
        });
        
        if(result.length>1){
        
        result[1] = result[0] ;
        }

        $("#poppSearchForm select option").each(function (i, elt) {
            if (($(elt).prop('selected') || $(elt).prop('checked')) && $(elt).val() != '') {
                var tab = $(elt).attr('presenton').split(',');
                result.push(tab);
            }
        });
       
          result = array_intersect(result);
       
        
           
       
        
        
    	
        liste_init = data.map.layers.popp_views_home_layer_openlayers_1.features ;
        console.log(result);
        
        var curseur = 0;
        $("#liste_series_gipbe").empty();
        for(j=0;j<liste_init.length;j++) {
        	console.log(data.map.layers.popp_views_home_layer_openlayers_1.features[j].attributes.nid) ;
        	if(result.includes(data.map.layers.popp_views_home_layer_openlayers_1.features[j].attributes.nid)){
        		console.log(data.map.layers.popp_views_home_layer_openlayers_1.features[j].attributes);
        		var node_id = data.map.layers.popp_views_home_layer_openlayers_1.features[j].attributes.nid ;
        		var title_serie = data.map.layers.popp_views_home_layer_openlayers_1.features[j].attributes.title ;
        		 displaySerie_gipbe(node_id,'clickIcon',curseur,title_serie);
        		 curseur = curseur +1 ;
        	
        	}
        	
        	
        }
        
        
        liste_init_2 = data.map.layers.popp_views_home_layer_openlayers_2.features ;
        
        
        for(j=0;j<liste_init_2.length;j++) {
        	console.log(data.map.layers.popp_views_home_layer_openlayers_2.features[j].attributes.nid) ;
        	if(result.includes(data.map.layers.popp_views_home_layer_openlayers_2.features[j].attributes.nid)){
        		console.log(data.map.layers.popp_views_home_layer_openlayers_2.features[j].attributes);
        		var node_id = data.map.layers.popp_views_home_layer_openlayers_2.features[j].attributes.nid ;
        		var title_serie = data.map.layers.popp_views_home_layer_openlayers_2.features[j].attributes.title ;
        		 displaySerie_gipbe(node_id,'clickIcon',curseur,title_serie);
        		 curseur = curseur +1 ;
        	
        	}
        	
        	
        }
        
       
     
       
        
        $("#nombreseries").text (result.length);
        
        var layers = data.openlayers.getLayersByClass('OpenLayers.Layer.Vector');
        if (layers.length > 0) {
            for (var i in layers) {
                if (layers[i].features[0] !== undefined) {
                    var first = true;
                    for (var j in layers[i].features) {
                        if (layers[i].features[j].cluster != null) {
                            for (var k in layers[i].features[j].cluster) {
                                if (result.indexOf(layers[i].features[j].cluster[k].data.nid) == -1 || (spatialSearch && !layers[i].features[j].onScreen())) {
                                    layers[i].features[j].cluster[k].style = {visibility: 'hidden'};
                                    popupSelect.unselect(layers[i].features[j]);
                                } else {
                                    if (first) {
                                        first = false;
                                        popupSelect.select(layers[i].features[j]);
                                    }
                                    delete layers[i].features[j].cluster[k].style;
                                }
                            }
                        } else {
                            if (result.indexOf(layers[i].features[j].data.nid) == -1 || (spatialSearch && !layers[i].features[j].onScreen())) {
                                layers[i].features[j].style = {visibility: 'hidden'};
                                popupSelect.unselect(layers[i].features[j]);
                            } else {
                                if (first) {
                                    first = false;
                                    popupSelect.select(layers[i].features[j]);
                                }else{
                                    popupSelect.unselect(layers[i].features[j]);
                                }
                                delete layers[i].features[j].style;
                            }
                        }
                    }
                }
                layers[i].strategies[0].resolution++;
                layers[i].events.triggerEvent("moveend", {zoomChanged: true});
                layers[i].redraw();
            }
        }
        //  saveActualSearch();
        e.preventDefault();
        e.stopImmediatePropagation();
        return false;
    }
    
    
    function displaySerie_gipbe(nid, source,nb,title) {
        if (lastNid == nid && source != "clickIcon") {
            return;
        }
        lastNid = nid;
        if (nid == null) {
            $("#liste_series_gipbe").html('').hide();
            return;
        }
        $.post(
            Drupal.settings.basePath + 'views/ajax',
            {
                view_name: 'popp_search_result_view', view_display_id: 'block', view_args: nid
            },

            function (response) {
                if (response[1] !== undefined) {
                    var viewHtml = response[1].data;
                    var $newdiv0 = $( "<div >"+title+"</div>" );
                    var $newdiv1 = $( "<div class='series-result' id='serie_"+nb+"'></div>" );
                    $("#liste_series_gipbe").append($newdiv0);
                    $("#liste_series_gipbe").append($newdiv1);
                    $("#serie_"+nb).html(viewHtml).show();
                    Drupal.attachBehaviors();
                }
            }
        );
    }
    
})(jQuery);