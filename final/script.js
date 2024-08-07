
document.addEventListener('DOMContentLoaded', function() {
    toggleButtons(false);
});
(function() {
    'use strict';

    // removing Magic Numbers
    // Zero and One from GaloisField(2)
    var zero = 0;
    var one = 1;
    var A = [
        [ one,  one, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero],
        [ one,  one,  one, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero],
        [zero,  one,  one,  one, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero],
        [zero, zero,  one,  one,  one, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero],
        [zero, zero, zero,  one,  one, zero, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero],
        [ one, zero, zero, zero, zero,  one,  one, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero],
        [zero,  one, zero, zero, zero,  one,  one,  one, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero],
        [zero, zero,  one, zero, zero, zero,  one,  one,  one, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero],
        [zero, zero, zero,  one, zero, zero, zero,  one,  one,  one, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero],
        [zero, zero, zero, zero,  one, zero, zero, zero,  one,  one, zero, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero],
        [zero, zero, zero, zero, zero,  one, zero, zero, zero, zero,  one,  one, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero, zero, zero],
        [zero, zero, zero, zero, zero, zero,  one, zero, zero, zero,  one,  one,  one, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero, zero],
        [zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero,  one,  one,  one, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero, zero],
        [zero, zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero,  one,  one,  one, zero, zero, zero,  one, zero, zero, zero, zero, zero, zero],
        [zero, zero, zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero,  one,  one, zero, zero, zero, zero,  one, zero, zero, zero, zero, zero],
        [zero, zero, zero, zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero, zero,  one,  one, zero, zero, zero,  one, zero, zero, zero, zero],
        [zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero,  one,  one,  one, zero, zero, zero,  one, zero, zero, zero],
        [zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero,  one,  one,  one, zero, zero, zero,  one, zero, zero],
        [zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero,  one,  one,  one, zero, zero, zero,  one, zero],
        [zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero,  one,  one, zero, zero, zero, zero,  one],
        [zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero, zero,  one,  one, zero, zero, zero],
        [zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero,  one,  one,  one, zero, zero],
        [zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero,  one,  one,  one, zero],
        [zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero,  one,  one,  one],
        [zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero,  one, zero, zero, zero,  one,  one]
    ];
    var n1 = [zero,  one,  one,  one, zero,  one, zero,  one, zero,  one,  one,  one, zero,  one,  one,  one, zero,  one, zero,  one, zero,  one,  one,  one, zero];
    var n2 = [ one, zero,  one, zero,  one,  one, zero,  one, zero,  one, zero, zero, zero, zero, zero,  one, zero,  one, zero,  one,  one, zero,  one, zero,  one];

    var obj = document.querySelectorAll('.row div');
    var cells = [];
    for (var key in obj) {
        if (obj.hasOwnProperty(key) && key !== 'length') {
            cells.push(obj[key]);
        }
    }

    var deepCopyMatrix = function(M) {
        return M.map(function(row) {
            return row.slice();
        });
    };

    var sumGF2 = function(a, b) {
        return (a !== b) ? one : zero;
    };

    var multGF2 = function(a, b) {
        return a * b;
    };

    var divGF2 = function(a, b) {
        if (b === zero) {
            console.log('Trying to divide by zero!');
        }
        return a;
    };

    var dotProduct = function(v1, v2) {
        return v1.map(function(e, index) {
            return multGF2(e, v2[index]);
        }).reduce(function(a, b) {
            return sumGF2(a, b);
        }, 0);
    };

    // Returns the Reduce Row Echelon Form representation of the M matrix
    var rref = function(M) {
        var N = deepCopyMatrix(M);
        var lead = 0;
        var rowCount = N.length;
        var columnCount = N[0].length;
        for (var r = 0; r < rowCount; r++) {
            if (lead >= columnCount) {
                return N;
            }
            var i = r;
            while (N[i][lead] === zero) {
                i += 1;
                if (i === rowCount) {
                    i = r;
                    lead += 1;
                    if (columnCount === lead) {
                        return N;
                    }
                }
            }
            var aux = N[i].slice();
            N[i] = N[r].slice();
            N[r] = aux;
            var lv = N[r][lead];
            N[r] = N[r].map(function(e) {
                return divGF2(e, lv)
            });
            for (var i = 0; i < rowCount; i++) {
                if (i !== r) {
                    lv = N[i][lead];
                    N[i] = N[i].map(function(e, index) {
                        return sumGF2(
                            e,
                            multGF2(lv, N[r][index])
                        )
                    });
                }
            }
            lead += 1;
        }
        return N;
    };

    function toggleButtons(showPlayAgain) {
    document.getElementById('shuffle').style.display = showPlayAgain ? 'none' : 'inline-block';
    document.getElementById('play-again').style.display = showPlayAgain ? 'inline-block' : 'none';
}

    var getRandomGF2Array = function() {
        var length = A.length;
        var arr = [];
        for (var i = 0; i < length; i++) {
            arr.push(Math.floor(Math.random() * 2));
        }
        return arr;
    };

    var getRandomState = function() {
        var b = getRandomGF2Array();
        // checking for Orthogonality for (b, n1) and (b, n2) so that b is a winnable state
        while (dotProduct(b, n1) !== zero || dotProduct(b, n2) !== zero) {
            b = getRandomGF2Array();
        }
        return b;
    };

    var hasWon = function() {
        return document.querySelector('.on') === null;
    };

    var getCurrentState = function() {
        var obj = document.querySelectorAll('.on');
        var b = [zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero, zero];
        for (var key in obj) {
            if (obj.hasOwnProperty(key) && key !== 'length') {
                b[obj[key].id - 1] = one;
            }
        }
        return b;
    };
    document.getElementById('play-again').addEventListener('click', function(event) {
    toggleButtons(false);
    // Reset the game board
    cells.forEach(function(e) {
        e.className = '';
    });
});
document.getElementById('shuffle').addEventListener('click', function(event) {
    toggleButtons(false);
    var b = getRandomState();
    for (var i = b.length - 1; i >= 0; i--) {
        var element = document.getElementById(i + 1);
        if (b[i] === one) {
            element.className = 'on';
        }
        else {
            element.className = '';
        }
    }
    // Remove any existing solution highlights
    cells.forEach(function(e) {
        e.classList.remove('yellow');
        e.classList.remove('solver');
    });
});


    cells.forEach(function(e, i) {
        e.addEventListener('click', function(event) {
            var aux = parseInt(this.id, 10);
            var toSwitch = [aux, aux - 5, aux + 5];

            if (aux % 5 !== 0) {
                toSwitch.push(aux + 1);
            }
            if (aux % 5 !== 1) {
                toSwitch.push(aux - 1);
            }

            for (var i = toSwitch.length - 1; i >= 0; i--) {
                if (toSwitch[i] > 0 && toSwitch[i] <= A.length) {
                    var element = document.getElementById(toSwitch[i]);
                    if (element.classList.contains('on')) {
                        element.classList.remove('on');
                    }
                    else {
                        element.classList.add('on');
                    }
                }
            }



        if (hasWon()) {
    alert('You Finished the Game Successfully!');
    toggleButtons(true);
    cells.forEach(function(e, i) {
        e.className = '';
    });
}

        });
    });
})();
