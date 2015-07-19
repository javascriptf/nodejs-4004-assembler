# js-4004-assembler
**js-4004-assembler** is an *assembler* for **Intel 4004** *microprocessor*, written in *javascript*. Despite being the first `4-bit` *microprocessor* from *Intel*, the **4004** has a surprisingly complex *opcodes*. However, the *opcode table* is simple enough. Also, it is important to mention that this assembler **only** accepts *numbers* for *registers* and *conditions*, instead of *names* or *symbols*. It is a **very crude** *assembler*.


## demo

<img src="/assets/img/0.png" width="70%"><br/>
The source file `test.asm` with **4004** instructions.
<br/><br/>


<img src="/assets/img/1.png" width="70%"><br/>
Run assembler as `node main <destination> <source>`.<br/>
Here it is `node main test.bin test.asm`.
<br/><br/>


<img src="/assets/img/2.png" width="70%"><br/>
`test.asm` is converted into `test.bin`.
<br/><br/>


<img src="/assets/img/3.png" width="70%"><br/>
`test.bin` contains *machine code* for **4004**.
<br/><br/>
