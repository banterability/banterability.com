# ## Usage
usage :
	@echo ''
	@echo 'make styles            : Compile stylus into css'
	@echo ''

.PHONY: styles

styles :
	stylus -c styles.styl
