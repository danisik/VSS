VSS

# Časti aplikace:
## 1. základní porovnání strategií - HOTOVO
- možnost spustit proti sobě 2 techniky pro ukázku jejich chování pro N iterací (vizualizace
podobná jako tady https://youtu.be/BOvAbjfJ0x0?t=296)


- nebudou tu žádné mutace, rušení, půjde především o ukázání chování zvolené strategie
## 2. iterační zobrazení
- možnost navolit kolik strategií pustit proti sobě (2x kafka, 1x podrazák, ...)
o princip – každý s každým, počítá se celkové skóre, ten kdo má nejvíc vyhrál - HOTOVO


- možné modifikace
  - faktor rušení s X pravděpodobností - HOTOVO
  - jak rychle to bude probíhat
  - mutace – nejsilnější se rozmnoží a zabije nejslabšího
  - pamatování si minulých her s protivníkem – na základě toho při výpočtu
rozhodnutí, může pozměnit svoje rozhodnutí (bude to něco jako rušení, ale
pravděpodobnost na změnu se bude vypočítávat na základě toho kolikrát mě
ne/podrazil v minulých hrách) - HOTOVO


- Možnost spuštění na N iterací, v případě mutací možnost spuštění do té doby, dokud to
nebude konvergovat k nějaké strategii


- grafy
  - 1.graf
    - ukazoval by počet jedinců v generaci podle strategie
  - 2.graf
    - celkové skóre strategií v průběhu iterací
