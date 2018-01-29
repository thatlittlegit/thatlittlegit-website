RST=$(wildcard *.rst)
HTML=$(RST:.rst=.html)

site: check $(HTML)

clean:
	rm $(wildcard *.html)
check:
	@echo | rst2html 2>/dev/null >/dev/null || (echo "error: rst2html missing! is it installed?" && exit 1) || exit 1

$(HTML):
	rst2html $(@:.html=.rst) $@ --stylesheet=main.css

