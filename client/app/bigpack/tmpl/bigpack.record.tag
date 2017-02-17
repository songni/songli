<form ref="bigpackRecordForm" novalidate>
	<div class="sound-record sound-one" riot-style="{ height: document.body.innerHeight - 54 + 'px' }">
		<div class="to-who">
			<img src="https://img.91pintuan.com/songli/word_send_to.png" />
			<br>
			<input type="text" placeholder="{ opts.forms.bigpackRecordForm.name.$invalid && opts.forms.bigpackRecordForm.$submitted ? '昵称未填写' : 'Ta的名字' }" ref="name" class="input-msg input-one"/>
			<p show="{ opts.forms.bigpackRecordForm.name.$error.maxlength && opts.forms.bigpackRecordForm.$submitted }" class="help-block">昵称字数太多.</p>
			<p show="{ opts.forms.bigpackRecordForm.name.$error.required && opts.forms.bigpackRecordForm.$submitted }" class="help-block">昵称未填写.</p>
		</div>
		<order-record-voice store-field="bigpack"></gift-record-voice>
	</div>
</form>

