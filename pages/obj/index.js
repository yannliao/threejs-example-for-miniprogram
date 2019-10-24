import * as THREE from '../../libs/three.weapp.js'
import loadObj from './loadObj'

Page({
	data: {},
	onLoad: function () {
		wx.createSelectorQuery()
			.select('#c')
			.node()
			.exec((res) => {
				const canvas = new THREE.global.registerCanvas(res[0].node)
				loadObj(canvas, THREE)
			})
	},
	onUnload: function () {
		THREE.global.clearCanvas()
	},
	touchStart(e) {
		console.log('canvas', e)
		THREE.global.touchEventHandlerFactory('document', 'touchstart')(e)
	},
	touchMove(e) {
		console.log('canvas', e)
		THREE.global.touchEventHandlerFactory('document', 'touchmove')(e)
	},
	touchEnd(e) {
		console.log('canvas', e)
		THREE.global.touchEventHandlerFactory('document', 'touchend')(e)
	},
	touchCancel(e) {
		// console.log('canvas', e)
	},
	longTap(e) {
		// console.log('canvas', e)
	},
	tap(e) {
		// console.log('canvas', e)
	},
})
