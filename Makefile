RST=$(wildcard *.rst)
HTML=$(RST:.rst=.html)
SVG=$(wildcard *_.svg)
SVGD=$(SVG:_.svg=.svg)
PNG=$(SVG:_.svg=.png)

site: check $(HTML) $(SVGD) $(PNG)

clean:
	-rm $(HTML) $(SVGD) $(PNG)

check:
	@echo | rst2html 2>/dev/null >/dev/null || (echo "error: rst2html missing! is it installed?" && exit 1) || exit 1
	@echo | svgo 2>/dev/null >/dev/null || (echo "error: svgo missing! is it installed?" && exit 1) || exit 1
	@echo | convert --version 2>/dev/null >/dev/null || (echo "error: convert missing! is it installed?" && exit 1) || exit 1

$(HTML):
	rst2html $(@:.html=.rst) $@ --stylesheet=main.css --title=`grep '$@' titles.txt | cut -d'	' -f2`

$(SVGD):
	svgo --quiet $(@:.svg=_.svg) -o $@

$(PNG):
	convert $(@:.png=_.svg) $@

.PHONY: site clean check
