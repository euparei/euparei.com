(function() {

	var frmEuParei;
	var inPareiDe, inPareiEm, inPareiAs;
	var lnkCompartilhar;
	var outResultado, outLinkCopiado, outPareiDe, outAnos, outMeses, outDias, outHoras, outMinutos;

// // // // // // // // // // // // // // // // // // // // // // // // //
	function fixPareiDe(str) { return str == '' ? '???' : str; }
	function fixNumber2(n) { return n < 10 ? '0' + n : n; }
	function fixMonth(n) { return fixNumber2(n + 1); }
// // // // // // // // // // // // // // // // // // // // // // // // //

	function frmEuParei_Submit(evento) {
		evento.preventDefault();
		outPareiDe.innerText = fixPareiDe(inPareiDe.value);
		Utils.DOM.visible(outResultado);
		lnkCompartilhar.focus();
	}

	function lnkCompartilhar_Click() {
		Utils.DOM.unhide(outLinkCopiado);
		setTimeout(
			function() { Utils.DOM.hide(outLinkCopiado); }, 3000
		);
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function initGlobals() {
		frmEuParei = Utils.$('frm-eu-parei');
		var frmEuPareiElements = frmEuParei.elements;
		inPareiDe = frmEuPareiElements['in-parei-de'];
		inPareiEm = frmEuPareiElements['in-parei-em'];
		inPareiAs = frmEuPareiElements['in-parei-as'];
		lnkCompartilhar = Utils.$('lnk-compartilhar');
		outLinkCopiado = Utils.$('out-link-copiado');
		outResultado = Utils.$('out-resultado');
		outPareiDe = Utils.$('out-parei-de');
		outAnos = Utils.$('out-anos');
		outMeses = Utils.$('out-meses');
		outDias = Utils.$('out-dias');
		outHoras = Utils.$('out-horas');
		outMinutos = Utils.$('out-minutos');
	}

	function initAutoComplete() {
		inPareiDe.name = '';
		inPareiEm.name = '';
		inPareiAs.name = '';
	}

	function initInputs() {
		var agora = new Date();
		inPareiEm.value = fixNumber2(agora.getDate()) + '/' + fixMonth(agora.getMonth()) + '/' + agora.getFullYear();
		inPareiAs.value = fixNumber2(agora.getHours()) + ':' + fixNumber2(agora.getMinutes());
	}

	function initForms() {
		frmEuParei.addEventListener('submit', frmEuParei_Submit);
	}

	function initLinks() {
		lnkCompartilhar.addEventListener('click', lnkCompartilhar_Click);
	}

	function init() {
		initGlobals();
		initAutoComplete();
		initForms();
		initInputs();
		initLinks();
	}

	window.addEventListener('load', init);

})();