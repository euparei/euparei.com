(function() {

	var frmEuParei;
	var inCopiador, inPareiDe, inPareiEm, inPareiAs;
	var lnkCompartilhar;
	var outResultado, outResultadoFrase, outLinkCopiado;

// // // // // // // // // // // // // // // // // // // // // // // // //
	function fixPareiDe(str) { return str == '' ? '???' : str; }
	function fixNumber2(n) { return n < 10 ? '0' + n : n; }
	function fixMonth(n) { return fixNumber2(n + 1); }
// // // // // // // // // // // // // // // // // // // // // // // // //

	function frmEuParei_Submit(evento) {
		evento.preventDefault();
		exibirResultado(euPareiJson());
		setTimeout(
			function() { lnkCompartilhar.focus(); }, 150
		);
	}

	function lnkCompartilhar_Click(evento) {
		evento.preventDefault();
		salvar(euPareiJson());
		inCopiador.value = document.location.href;
		inCopiador.select();
		document.execCommand('copy');
		setTimeout(
			function() { lnkCompartilhar.focus(); }, 100
		);
		Utils.DOM.unhide(outLinkCopiado);
		setTimeout(
			function() { Utils.DOM.hide(outLinkCopiado); }, 3000
		);
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function euPareiJson() {
		var euParei = {
			de: inPareiDe.value,
			em: inPareiEm.value, 
			as: inPareiAs.value
		};
		return euParei;
	}

	function salvar(euParei) {
		document.location.hash = btoa(JSON.stringify(euParei));
	}

	function exibirResultado(euParei) {
		var partesEm = euParei.em.split('/');
		var dia = partesEm[0];
		var mes = partesEm[1];
		var ano = partesEm[2];
		var em = new Date(ano, mes - 1, dia);
		var partesAs = euParei.as.split(':');
		var as = {
			horas: partesAs[0],
			minutos: partesAs[1]
		};
		var agora = new Date();
		var resultado = {
			pareiDe: fixPareiDe(euParei.de),
			anos: Utils.DATE.years(agora, em),
			meses: Utils.DATE.months(agora, em),
			dias: Utils.DATE.days(agora, em),
			horas: Utils.DATE.hours(agora, as.horas),
			minutos: Utils.DATE.minutes(agora, as.minutos)
		};
		var sb = [];
		sb.push('Voc&ecirc; est&aacute; h&aacute; ');
		if (resultado.anos > 0) {
			sb.push('<b>' + resultado.anos + '</b> ano' + plural(resultado.anos, 's'));
		}
		if (resultado.meses > 0) {
			if (resultado.anos > 0) {
				if (resultado.dias > 0 || resultado.horas > 0 || resultado.minutos > 0) {
					sb.push(', ');
				} else {
					sb.push(' e ');					
				}
			}
			sb.push('<b>' + resultado.meses + '</b> m' + plural(resultado.meses, 'eses', '&ecirc;s'));
		}
		if (resultado.dias > 0 || (resultado.anos <= 0 && resultado.meses <= 0 && resultado.horas <= 0 && resultado.minutos <= 0)) {
			if (resultado.anos > 0 || resultado.meses > 0) {
				if (resultado.horas > 0 || resultado.minutos > 0) {
					sb.push(', ');
				} else {
					sb.push(' e ');					
				}
			}
			sb.push('<b>' + resultado.dias + '</b> dia' + plural(resultado.dias, 's'));
		}
		if (resultado.horas > 0) {
			if (resultado.anos > 0 || resultado.meses > 0 || resultado.dias > 0) {
				if (resultado.minutos > 0) {
					sb.push(', ');
				} else {
					sb.push(' e ');					
				}
			}
			sb.push('<b>' + resultado.horas + '</b> hora' + plural(resultado.horas, 's'));
		}
		if (resultado.minutos > 0) {
			if (resultado.anos > 0 || resultado.meses > 0 || resultado.dias > 0 || resultado.horas > 0) {
				sb.push(' e ');					
			}
			sb.push('<b>' + resultado.minutos + '</b> minuto' + plural(resultado.minutos, 's'));
		}
		sb.push(' sem <b>' + resultado.pareiDe + '</b>.');
		outResultadoFrase.innerHTML = sb.join('');
		salvar(euParei);
		Utils.DOM.visible(outResultado);
	}

	function plural(n, strPlural, strSingular) {
		if (n == 1) {
			return strSingular ? strSingular : '';
		} else {
			return strPlural;
		}
	}

// // // // // // // // // // // // // // // // // // // // // // // // //

	function initGlobals() {
		frmEuParei = Utils.$('frm-eu-parei');
		var frmEuPareiElements = frmEuParei.elements;
		inCopiador = frmEuPareiElements['in-copiador'];
		inPareiDe = frmEuPareiElements['in-parei-de'];
		inPareiEm = frmEuPareiElements['in-parei-em'];
		inPareiAs = frmEuPareiElements['in-parei-as'];
		lnkCompartilhar = Utils.$('lnk-compartilhar');
		outLinkCopiado = Utils.$('out-link-copiado');
		outResultado = Utils.$('out-resultado');
		outResultadoFrase = Utils.$('out-resultado-frase');
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