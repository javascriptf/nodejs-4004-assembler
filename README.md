*Assembler* for [Intel 4004 microprocessor](https://en.wikipedia.org/wiki/Intel_4004),
written in *javascript*. Despite being the first *4-bit microprocessor* from
*Intel*, the **4004** has a surprisingly complex *opcodes*. However, the
[opcode table](http://www.intel.com/Assets/PDF/DataSheet/4004_datasheet.pdf)
is simple enough. Also, it is important to mention that this assembler **only**
accepts *numbers* for *registers* and *conditions*, instead of *names* or
*symbols*. It is a **very crude** *assembler*.
<br>
<br>


![](assets/img/0.png)<br>
The source file `test.asm` with **4004** instructions.
<br><br>


![](assets/img/1.png)<br>
Run assembler as `node main <destination> <source>`.<br>
Here it is `node main test.bin test.asm`.
<br><br>


![](assets/img/2.png)<br>
`test.asm` is converted into `test.bin`.
<br><br>


![](assets/img/3.png)<br>
`test.bin` contains *machine code* for **4004**.
<br><br>
