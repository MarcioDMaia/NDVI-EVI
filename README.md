# NDVI-EVI


## Proposta:
>- Identifique uma região que contenha área de vegetação sob manejo e vegetação natural.
>- Construa um gráfico temporal (valor do Índice no Y e dias ou meses no X) comparando para a area escolhida os produtos EVI e NDVI do Landsat 8.
>- Inicialmente para um ano e depois multi anual.

Diante da proposta e da abordagem do exercicio, desmembrar a resolução se torna essencial para a compreensão de escolhas da abordagem.


### Fórmulas:
[NDVI (Indice de vegetação por diferença normalizada)](https://en.wikipedia.org/wiki/Normalized_difference_vegetation_index) : $NDVI = \frac{\rho_{nir} - \rho_{red}}{\rho_{nir} + \rho_{red}}$

Onde 

$\rho_{nir}$ = reflectância na banda infravermelho próximo

$\rho_{red}$ = reflectância na banda vermelho

> NDVI tem como diversas ultilidades, a ultilizada no estudo, é a mudança sazionais e interanuais de vegetações 
[Referencia: John R. Jensen - Sensoriamento Remoto do Ambiente ](https://libgen.is/book/index.php?md5=231A0EB2C386CB0B55510D6DC1CC269F)

[EVI (Indice de vegetação realçado)](https://en.wikipedia.org/wiki/Enhanced_vegetation_index)$$EVI = \frac{G(L+1){\rho_{nir}-\rho_{red}}}{\rho_{nir}+C_1\rho_{red}-C_2\rho_{blue}+L}$$

Onde

$\rho_{nir}$ = reflectância na banda do infravermelho próximo

$\rho_{red}$ = reflectância na banda do vermelho

$\rho_{blue}$ = reflectância na banda do azul

$G, L, C_1, C_2 = 2.5, 1, 6, 7.5$
respectivamente

>O EVI é um NDVI modificado, contendo um fator de ajuste para solos (L), e dois coeficientes $(C_1; e C_2)$,
>que descrevem o uso da banda azul para correção da banda vermelha quanto ao espalhamento atmosférico por aerossóis.[Referencia: John R. Jensen - Sensoriamento Remoto do Ambiente](https://libgen.is/book/index.php?md5=231A0EB2C386CB0B55510D6DC1CC269F)

---

Estudo de casos:
Coordenadas do primeiro roi:
Primeiro roi considerado se localiza na região suldeste de Goiânia, com a cidade mais proxima localizada a noroeste do roi, chamada Santo Antônio do Rio verde, [com aproximadademente 3000 habitantes](https://pt.wikipedia.org/wiki/Santo_Antônio_do_Rio_Verde). Tal cidade é um importante produtor de grãos, sobretudo soja. Ao efetuarmos uma série temporal do NDVI e EVI calculados com a média dos pixels de cada imagem da coleção do landsat-8 no roi (entre os períodos de 01/05/2021 - 01/05/2022 [para o NDVI] e 01/05/2018 - 01/05/2022 (para o EVI)) obtemos os seguintes gráficos:

---
<img src = "ee-chart (4).png">

> Série temporal do NDVI e EVI no período de um ano

---
<img src = "ee-chart (3).png">

> Série temporal do NDVI e EVI no período de quarto anos


## Comparação do EVI e NDVI com gráficos de outra região (Pará) para o mesmo tipo de plantío.
