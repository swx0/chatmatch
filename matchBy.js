const types = ["INFP", "ENFP", "INFJ", "ENFJ", "INTJ", "ENTJ", "INTP", "ENTP", "ISFP", "ESFP", "ISTP", "ESTP", "ISFJ", "ESFJ", "ISTJ", "ESTJ"];
const compatibility = [ [75, 75, 75, 100, 75, 100, 75, 75, 0, 0, 0, 0, 0, 0, 0, 0],
                        [75, 75, 100, 75, 100, 75, 75, 75, 0, 0, 0, 0, 0, 0, 0, 0],
                        [75, 100, 75, 75, 75, 75, 75, 100, 0, 0, 0, 0, 0, 0, 0, 0],
                        [100, 75, 75, 75, 75, 75, 75, 75, 100, 0, 0, 0, 0, 0, 0, 0],
                        [75, 100, 75, 75, 75, 75, 75, 100, 50, 50, 50, 50, 25, 25, 25, 25],
                        [100, 75, 75, 75, 75, 75, 100, 75, 50, 50, 50, 50, 50, 50, 50, 50],
                        [75, 75, 75, 75, 75, 100, 75, 75, 50, 50, 50, 50, 25, 25, 25, 100],
                        [75, 75, 100, 75, 100, 75, 75, 75, 50, 50, 50, 50, 25, 25, 25, 25],
                        [0, 0, 0, 100, 50, 50, 50, 50, 25, 25, 25, 25, 50, 100, 50, 100],
                        [0, 0, 0, 0, 50, 50, 50, 50, 25, 25, 25, 25, 100, 50, 100, 50],
                        [0, 0, 0, 0, 50, 50, 50, 50, 25, 25, 25, 25, 50, 100, 50, 100],
                        [0, 0, 0, 0, 50, 50, 50, 50, 25, 25, 25, 25, 100, 50, 100, 50],
                        [0, 0, 0, 0, 25, 50, 25, 25, 50, 100, 50, 100, 75, 75, 75, 75],
                        [0, 0, 0, 0, 25, 50, 25, 25, 100, 50, 100, 50, 75, 75, 75, 75],
                        [0, 0, 0, 0, 25, 50, 25, 25, 50, 100, 50, 100, 75, 75, 75, 75],
                        [0, 0, 0, 0, 25, 50, 100, 25, 100, 50, 100, 50, 75, 75, 75, 75] ]

export function matchByType(first, second) {
     return compatibility[types.indexOf(first)][types.indexOf(second)];
}

export function matchByMods(first, second) {
     return first.filter( n => second.indexOf(n) !== -1).length;
}

export function matchByHobbies(first, second) {
     var result = 0;
     for (var i = 0; i < first.length; i++) {
          result += Math.abs(parseInt(first[i]) - parseInt(second[i]));
     }

     return ((16-result) / 16) * 100;
}

export function totalMatch(typeMatch, modMatch, l1, l2, hobbiesMatch, config) { //l1 and l2 is the number of mods taken by each person
     if (config === "Default") {
          return (typeMatch * 0.45) + ((modMatch / Math.min(l1, l2) * 100) * 0.4) + (hobbiesMatch * 0.15);
     } else if (config === "Personality-heavy") {
          return (typeMatch * 0.55) + ((modMatch / Math.min(l1, l2) * 100) * 0.25) + (hobbiesMatch * 0.2);
     } else {
          return (typeMatch * 0.3) + ((modMatch / Math.min(l1, l2) * 100) * 0.6) + (hobbiesMatch * 0.1);
     }
     

}
 





const mod1 = ["science", "math", "chinese"];
const mod2 = ["math"];

