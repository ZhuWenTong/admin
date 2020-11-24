<template>
	<div id="editor"></div>
</template>

<script>
import E from 'wangeditor'
export default {
	data () {
		return {
			
		}
	},
	props: {
		
	},
	methods: {
		
	},
	mounted () {
		const editor = new E('#editor')
		editor.config.uploadImgServer = '/upload-img'
		editor.create()
	}
}
</script>
