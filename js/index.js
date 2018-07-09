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
		var partes = inPareiEm.value.split('/');
		var dia = partes[0];
		var mes = partes[1];
		var ano = partes[2];
		var em = new Date(ano, mes - 1, dia);
		var agora = new Date();
		var resultado = {
			pareiDe: fixPareiDe(inPareiDe.value),
			anos: Utils.DATE.years(agora, em),
			meses: Utils.DATE.months(agora, em),
			dias: Utils.DATE.days(agora, em),
			horas: 0,
			minutos: 0
		}
		exibirResultado(resultado);
		lnkCompartilhar.focus();
	}

	function lnkCompartilhar_Click() {
		Utils.DOM.unhide(outLinkCopiado);
		setTimeout(
			function() { Utils.DOM.hide(outLinkCopiado); }, 3000
		);
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function exibirResultado(resultado) {
		outPareiDe.innerText = resultado.pareiDe;
		outAnos.innerText = resultado.anos;
		outMeses.innerText = resultado.meses;
		outDias.innerText = resultado.dias;
		outHoras.innerText = resultado.horas;
		outMinutos.innerText = resultado.minutos;
		document.location.hash = JSON.stringify(resultado);
		Utils.DOM.visible(outResultado);
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