<script>
export default {
	onLaunch: function() {
		// setRemInit();
		console.log('App Launch');
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	}
};
</script>

<style lang="less">
/* 每个页面公共css */

/* 去除刘海 */
page {
	--safe-area-inset-top: 0;
	--safe-area-inset-right: 0;
	--safe-area-inset-bottom: 0;
	--safe-area-inset-left: 0;
	height: 100%;
	box-sizing: border-box;
}
@supports (top: constant(safe-area-inset-top)) {
	page {
		--safe-area-inset-top: constant(safe-area-inset-top);
		--safe-area-inset-right: constant(safe-area-inset-right);
		--safe-area-inset-bottom: constant(safe-area-inset-bottom);
		--safe-area-inset-left: constant(safe-area-inset-left);
	}
}
@supports (top: env(safe-area-inset-top)) {
	page {
		--safe-area-inset-top: env(safe-area-inset-top);
		--safe-area-inset-right: env(safe-area-inset-right);
		--safe-area-inset-bottom: env(safe-area-inset-bottom);
		--safe-area-inset-left: env(safe-area-inset-left);
	}
}

.flex{
	&-center{
		display: flex;
		align-items: center;
	}
	&-center-between{
		display: flex;
		align-items: center;
		justify-content: space-between;
		
	}
	&-center-center{
		display: flex;
		align-items: center;
		justify-content: center;
	}
	&-1{
		flex: 1;
	}
}
button{
	border: 0;
	border-radius: 0;
	&::after{
		content: none;
	}
}

</style>
