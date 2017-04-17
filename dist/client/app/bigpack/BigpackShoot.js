import riot from 'riot';
import route from 'riot-route';
import { View, Connect, Form, onUse } from '../../framework/ninjiajs/src/index';
import Wechat from '../../framework/wechat/index';
import actions from './bigpack.actions';

@View
@Form({
	image: {
		required: true
	}
})
@Connect(
	state => ({
		merchant: state.merchant,
		order: state.bigpack,
		user: state.user,
		clientWidth: state.clientWidth
	}),
	dispatch => ({
		uploadImage: () => dispatch(actions.uploadImage),
		onSubmit: function(e){ return dispatch(actions.onSubmit(e, this.opts)) },
		enterBigpackShoot: (next, ctx) => dispatch(actions.enterBigpackShoot(next, ctx))
	})
)
export default class BigpackShoot extends riot.Tag {
	static originName = 'bigpack-shoot'

	get name() {
		return 'bigpack-shoot'
	}

	get tmpl() { return `<div class="shoot">
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
        <img onclick="{ opts.uploadImage }" riot-src="{ opts.order.localId ? opts.order.localId : '//img.91pintuan.com/songli/client2/def_img.jpg' }" />
      </div>
      <div class="button">
        <input type="button" value="下一步" onclick="{ opts.onSubmit.bind(this) }"/>
      </div>
    </div>
  </div>
</div>
 ` }

	@onUse('enterBigpackShoot')
	onCreate(opts) {}
}