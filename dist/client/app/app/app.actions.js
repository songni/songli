export default {
	setClientWidth: () => ({type: 'body/clientWidth', payload: document.body.clientWidth}),
	setClientHeight: () => ({type: 'body/clientHeight', payload: screen.height})
}