<div class="shoot">
  <div class="shoot_warp">
    <div class="shoot_cont">
      <div class="header">
        <div class="user_photo"><img riot-src="{ opts.user.photo }"></div>
        <div class="user_name">
          <span>{ opts.user.name }，请上传你的微信二维码名片</span>
        </div>
      </div>
      <div class="note">
        <span>上传二维码名片，便于客户领取礼品后添加你的微信</span>
        <span>路径：微信—我—个人信息—我的二维码</span>
      </div>
      <div class="img" style=" width:{ opts.clientWidth * 0.8 }px; height:{ (opts.clientWidth * 0.8)*4/3 }px; ">
        <img onclick="{ opts.uploadImage }" riot-src="{ opts.order.localId ? opts.order.localId : 'https://img.91pintuan.com/songli/client2/def_img.jpg' }" />
      </div>
      <div class="button">
        <input type="button" value="下一步" onclick="{ opts.onSubmit.bind(this) }"/>
      </div>
    </div>
  </div>
</div>
