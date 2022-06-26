function prepare {
    python -m pip install --upgrade pip
    pip install sphinx
    sudo apt-get update -y
    sudo apt-get install -y latexmk texlive-latex-recommended texlive-latex-extra texlive-fonts-recommended
    sudo apt-get install texlive-xetex latex-cjk-all
    sudo apt-get install pandoc
    sudo apt install dos2unix
    wget https://github.com/wweir/source-han-sans-sc/archive/refs/heads/master.zip
    wget https://github.com/adobe-fonts/source-han-serif/raw/11f5ed33a61971e175f68df52ebd5951013ba643/OTF/SourceHanSerifSC_SB-H.zip
    wget https://github.com/adobe-fonts/source-han-serif/raw/11f5ed33a61971e175f68df52ebd5951013ba643/OTF/SourceHanSerifSC_EL-M.zip
    unzip master.zip -d SourceHanSansSC
    unzip SourceHanSerifSC_EL-M.zip -d SourceHanSerifSC_EL-M
    unzip SourceHanSerifSC_SB-H.zip -d SourceHanSerifSC_SB-H
    sudo mv SourceHanSansSC SourceHanSerifSC_EL-M SourceHanSerifSC_SB-H /usr/share/fonts/opentype/
    wget -O source-serif-pro.zip https://www.fontsquirrel.com/fonts/download/source-serif-pro
    unzip source-serif-pro -d source-serif-pro
    sudo mv source-serif-pro /usr/share/fonts/opentype/
    wget -O source-sans-pro.zip https://www.fontsquirrel.com/fonts/download/source-sans-pro
    unzip source-sans-pro -d source-sans-pro
    sudo mv source-sans-pro /usr/share/fonts/opentype/
    wget -O source-code-pro.zip https://www.fontsquirrel.com/fonts/download/source-code-pro
    unzip source-code-pro -d source-code-pro
    sudo mv source-code-pro /usr/share/fonts/opentype/
    sudo fc-cache -f -v
}

function generate_pdf {
    localDir="source"
    cp .github/scripts/Makefile .
    for lang in en zh
    do
        mkdir -p $localDir/img
        if [[ "$lang" == "en" ]] ;then
            cp -r ./docs/* $localDir/
            cp -r static/img/* $localDir/img
            cp .github/scripts/conf.py $localDir/
            cd $localDir
            sed -i "s/language = 'zh_CN'/language = 'en_US'/" conf.py
            echo "printing English version PDF"
        else
            cp -r ./i18n/zh/docusaurus-plugin-content-docs/current/* $localDir/
            cp -r static/img/* $localDir/img
            cp .github/scripts/conf.py $localDir/
            cd $localDir
            sed -i "s/language = 'en_US'/language = 'zh_CN'/" conf.py
            echo "printing Chinese version PDF"
        fi
        touch index.rst

        for f in `find . -type f -name "*.md"`
        do
            fileName=${f##*/}
            path=${f%/*}
            touch ${path}/index.rst
            pandoc $f --wrap=none -o "$f.rst"
            rm $f
        done

        cd ..
        python .github/scripts/generate-pdf.py
        make latexpdf
        mkdir -p pdf
        cp _build/latex/*.pdf ./pdf/apache_$1_docs_$lang.pdf
        echo "apache_$1_docs_$lang.pdf"
        make clean
        rm -rf {_build,source}
    done
}

prepare
generate_pdf "shenyu"
