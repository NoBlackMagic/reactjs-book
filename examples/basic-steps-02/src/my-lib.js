
exports.greet = function(str) {
	return ['Hello ', str, '!'].join('');
};

exports.append = function(str) {
    var p = document.createElement('p');
    p.innerHTML = str;
    document.body.appendChild(p);
};
