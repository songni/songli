<div class="poi-address"  if="{ opts.pois.length }">
  <div class="list-group address_list">
    <a href="javascript:void(0)" class="list-group-item poiList"
        each="{ poi in opts.pois }"
        onclick="{selPoi(poi)}">
      <!--右侧按钮圈-->
      <span class="poi-com point"></span>
      <span class="poi-com point1" if="{ parent.opts.poi.id === poi.id }"></span>
      <div class="resLeft">
        <span class="distance" if="{ poi.distance }">{poi.distance}km</span>
        <h4 class="list-group-item-heading">
          { poi.base_info.business_name + (poi.base_info.branch_name ? '(' + poi.base_info.branch_name + ')' : '') }
        </h4>
        <p class="list-group-item-text">
          <span>{ poi.base_info.province }</span>
          <span>{ poi.base_info.city }</span>
          <span>{ poi.base_info.district }</span>
          <span>{ poi.base_info.address }</span>
        </p>
      </div>
    </a>
  </div>
</div>

<div if="{ !opts.pois.length }" class="beyWamp" >
  <div class="beyond">
    <span>:( 您当前位置距离该商家门店过远</span><br />
    <button class="bey_back"  onclick="{ dismiss }">返回</button>
  </div>
</div>