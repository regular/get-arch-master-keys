# CLI

```
npm i -g get-arch-master-keys
get-arch-master-keys
```

outputs (currently)

```
0E8B 6440 79F5 99DF C1DD  C397 3348 882F 6AC6 A4C2 | Pierre Schmitz
6841 48BB 25B4 9E98 6A49  44C5 5184 252D 824B 18E8 | Thomas Bächler
AB19 265E 5D7D 2068 7D30  3246 BA1D FB64 FFF9 79E7 | Allan McRae
91FF E070 0E80 619C EB73  235C A88E 23E3 7751 4E00 | Florian Pritz
DDB8 67B9 2AA7 89C1 65EE  FA79 9B72 9B06 A680 C281 | Bartłomiej Piotrowski
```

Programmatic use:

```
const pull = require('pull-stream')
const keys = require('get-arch-master-keys')

pull(
  keys(),
  pull.map( ({fingerprint, name}) => 
   `${fingerprint} | ${name}`
  ),
  pull.drain(console.log)
)
```
