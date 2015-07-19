// @wolfram77
// MAIN - Intel 4004 assembler (main)
// 


// required modules
var fs = require('fs');



// opcode table
var param = {
	'c': {'p': 0, 's': 4, 'a': 'condition'},
	'r': {'p': 0, 's': 4, 'a': 'register'},
	'R': {'p': 1, 's': 3, 'a': 'register pair'},
	'd': {'p': 0, 's': 4, 'a': 'immediate data'},
	'D': {'p': 8, 's': 8, 'a': 'rom data'},
	'a': {'p': 8, 's': 8, 'a': 'short rom address'},
	'A': {'p': 8, 's': 12, 'a': 'long rom address'}
};
var mnemonic = {
	// basic
	'NOP': {'v': [0x00], 'p': []},
	'JCN': {'v': [0x10, 0x00], 'p': ['c', 'a']},
	'FIM': {'v': [0x20, 0x00], 'p': ['R', 'D']},
	'FIN': {'v': [0x30], 'p': ['R']},
	'JIN': {'v': [0x31], 'p': ['R']},
	'JUN': {'v': [0x40, 0x00], 'p': ['A']},
	'JMS': {'v': [0x50, 0x00], 'p': ['A']},
	'INC': {'v': [0x60], 'p': ['r']},
	'ISZ': {'v': [0x70, 0x00], 'p': ['r', 'a']},
	'ADD': {'v': [0x80], 'p': ['r']},
	'SUB': {'v': [0x90], 'p': ['r']},
	'LD': {'v': [0xA0], 'p': ['r']},
	'XCH': {'v': [0xB0], 'p': ['r']},
	'BBL': {'v': [0xC0], 'p': ['d']},
	'LDM': {'v': [0xD0], 'p': ['d']},
	'CLB': {'v': [0xF0], 'p': []},
	'CLC': {'v': [0xF1], 'p': []},
	'IAC': {'v': [0xF2], 'p': []},
	'CMC': {'v': [0xF3], 'p': []},
	'RAL': {'v': [0xF5], 'p': []},
	'RAR': {'v': [0xF6], 'p': []},
	'TCC': {'v': [0xF7], 'p': []},
	'DAC': {'v': [0xF8], 'p': []},
	'TCS': {'v': [0xF9], 'p': []},
	'STC': {'v': [0xFA], 'p': []},
	'DAA': {'v': [0xFB], 'p': []},
	'KBP': {'v': [0xFC], 'p': []},
	'DCL': {'v': [0xFD], 'p': []},
	// io and ram
	'SRC': {'v': [0x21], 'p': ['R']},
	'WRM': {'v': [0xE0], 'p': []},
	'WMP': {'v': [0xE1], 'p': []},
	'WRR': {'v': [0xE2], 'p': []},
	'WPM': {'v': [0xE3], 'p': []},
	'WR0': {'v': [0xE4], 'p': []},
	'WR1': {'v': [0xE5], 'p': []},
	'WR2': {'v': [0xE6], 'p': []},
	'WR3': {'v': [0xE7], 'p': []},
	'SBM': {'v': [0xE8], 'p': []},
	'RDM': {'v': [0xE9], 'p': []},
	'RDR': {'v': [0xEA], 'p': []},
	'ADM': {'v': [0xEB], 'p': []},
	'RD0': {'v': [0xEC], 'p': []},
	'RD1': {'v': [0xED], 'p': []},
	'RD2': {'v': [0xEE], 'p': []},
	'RD3': {'v': [0xEF], 'p': []}
};


// push an array to another array 
var push = function(dst, src) {
	Array.prototype.push.apply(dst, src);
};


// insert data into array
var insert = function(arr, val, pos) {
	var i = pos >> 3, o = pos & 7;
	while(val) {
		arr[i--] |= ((val << o) & 0xFF);
		val >>= 8 - o;
		o = 0;
	}
};


// get opcode error
var opcodeErr = function(mnem, pars) {
	if(!(m = mnemonic[mnem])) return 'no such mnemonic';
	if(m.p.length != pars.length) return 'parameter count mismatch ('+m.p.length+')';
	for(var i=0; i<pars.length; i++) {
		var p = param[m.p[i]];
		if(pars[i] >= (1 << p.s)) return 'parameter overflow ('+p.a+' '+p.s+' bits)';
	}
};


// get opcode value (byte array)
var opcode = function(mnem, pars) {
	var m = mnemonic[mnem], o = m.v.slice();
	for(var i=0; i<pars.length; i++)
		insert(o, pars[i], param[m.p[i]].p);
	return o;
};


// assemble a string
var assemble = function(str) {
	var o = [], errs = [], lines = str.split('\n');
	for(var l=0; l<lines.length; l++) {
		if(!(tokens = lines[l].match(/[0-9A-z]+/g))) continue;
		var mnem = tokens[0].toUpperCase(), pars = [];
		for(var t=1; t<tokens.length; t++)
			pars.push(parseInt(tokens[t]));
		if(err = opcodeErr(mnem, pars)) errs.push({'l': l+1, 'e': err});
		else push(o, opcode(tokens[0].toUpperCase(), tokens.slice(1)));
	}
	return {'o': o, 'e': errs};
};


// run
var run = function(dst, src) {
	console.log(src+' -> '+dst);
	var srcstr = fs.readFileSync(src).toString();
	var ans = assemble(srcstr);
	if(ans.e.length > 0) {
		for(var i=0; i<ans.e.length; i++)
			console.log('['+ans.e[i].l+'] '+ans.e[i].e);
		console.log('');
		return;
	}
	var gen = new Buffer(ans.o);
	fs.writeFileSync(dst, gen);
};


// test
if(process.argv.length >= 4) run(process.argv[2], process.argv[3]);
