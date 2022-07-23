# Configuration file for the Sphinx documentation builder.
#
# This file only contains a selection of the most common options. For a full
# list see the documentation:
# https://www.sphinx-doc.org/en/master/usage/configuration.html

# -- Path setup --------------------------------------------------------------

# If extensions (or modules to document with autodoc) are in another directory,
# add these directories to sys.path here. If the directory is relative to the
# documentation root, use os.path.abspath to make it absolute, like shown here.
#
# import os
# import sys
# sys.path.insert(0, os.path.abspath('.'))
# -- Project information -----------------------------------------------------

project = 'Apache ShenYu document'
copyright = '2022, Apache ShenYu'
author = 'Apache ShenYu'


# -- General configuration ---------------------------------------------------
# The master toctree document.
master_doc = 'index'

# Add any Sphinx extension module names here, as strings. They can be
# extensions coming with Sphinx (named 'sphinx.ext.*') or your custom
# ones.
extensions = [
  'sphinx.ext.autodoc',
  'sphinx.ext.autosectionlabel',
]

pygments_style = 'vs'
# The suffix(es) of source filenames.
# You can specify multiple suffix as a list of string:
source_suffix = ['.rst']
# Add any paths that contain templates here, relative to this directory.
templates_path = ['_templates']

# The language for content autogenerated by Sphinx. Refer to documentation
# for a list of supported languages.
#
# This is also used if you do content translation via gettext catalogs.
# Usually you set "language" from the command line for these cases.
language = 'en_US'

# List of patterns, relative to source directory, that match files and
# directories to ignore when looking for source files.
# This pattern also affects html_static_path and html_extra_path.
exclude_patterns = ['_build', 'Thumbs.db', '.DS_Store']


# -- Options for HTML output -------------------------------------------------

# The theme to use for HTML and HTML Help pages.  See the documentation for
# a list of builtin themes.
#
html_theme = 'sphinx_rtd_theme'

# Add any paths that contain custom static files (such as style sheets) here,
# relative to this directory. They are copied after the builtin static files,
# so a file named "default.css" will overwrite the builtin "default.css".
html_static_path = ['_static']

latex_engine = 'xelatex'

latex_elements = {
    'papersize': 'a4paper',
    'pointsize': '10pt',
    'figure_align': 'htbp',
    'classoptions': ',oneside',
    'passoptionstopackages': r'\PassOptionsToPackage{svgnames}{xcolor}',
    'fontpkg': r'''
\setmainfont{Source Serif Pro}
\setsansfont{Source Sans Pro}
\setmonofont{Source Code Pro}
    ''',
    'preamble': r'''
\usepackage{ctex}
\makeatletter
\let\old@sverb\@sverb
\def\@sverb#1{\old@sverb{#1}\zz}
\def\zz#1{#1\ifx\@undefined#1\else\penalty\z@\expandafter\zz\fi}
\makeatother
\setCJKmainfont[BoldFont=Source Han Serif SC SemiBold]{Source Han Serif SC}
\setCJKsansfont[BoldFont=Source Han Sans SC Medium]{Source Han Sans SC Normal}
\setCJKmonofont{Source Han Sans SC Normal}
\usepackage[draft]{minted}
\setcounter{tocdepth}{3}
\usepackage{xurl}
\includegraphics[scale=1]{*.svg}
    ''',
    'fvset': r'''
\fvset{fontsize=\small}
    ''',
    'fncychap': r'\usepackage[Bjornstrup]{fncychap}',
    'babel' : r'''
\usepackage{polyglossia}
\setmainlanguage{english}
    ''',
    'printindex': r'\footnotesize\raggedright\printindex',
    'sphinxsetup':r'''
verbatimwithframe=false,
VerbatimColor={rgb}{0.95,0.95,0.92},
verbatimvisiblespace=\null,
verbatimcontinued=\null,
parsedliteralwraps=true,
inlineliteralwraps=true,
verbatimhintsturnover=false,
    '''
}
