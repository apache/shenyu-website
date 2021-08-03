function prepare {
    python -m pip install --upgrade pip
    pip install sphinx
    sudo apt-get update -y
    sudo apt-get install -y latexmk texlive-latex-recommended texlive-latex-extra texlive-fonts-recommended
    sudo apt-get install texlive-xetex latex-cjk-all
    sudo apt-get install pandoc
    sudo apt install dos2unix
    wget https://github.com/adobe-fonts/source-han-sans/raw/release/OTF/SourceHanSansSC.zip
    wget https://github.com/adobe-fonts/source-han-serif/raw/release/OTF/SourceHanSerifSC_SB-H.zip
    wget https://github.com/adobe-fonts/source-han-serif/raw/release/OTF/SourceHanSerifSC_EL-M.zip
    unzip SourceHanSansSC.zip -d SourceHanSansSC
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
    mkdir -p ./public/pdf
    for lang in en zh
    do
        mkdir -p $localDir/img
        cp -r ./content/$lang/projects/$1/* $localDir/
        cp -r static/img/* $localDir/img
        cp .github/scripts/conf.py $localDir/
        cd $localDir
        if [[ "$lang" == "en" ]] ;then
            sed -i "s/language = 'zh_CN'/language = 'en_US'/" conf.py
            echo "printing English version PDF"
        else
            sed -i "s/language = 'en_US'/language = 'zh_CN'/" conf.py
            echo "printing Chinese version PDF"
        fi
        echo -e ".. toctree::\n   :maxdepth: 1\n   :titlesonly:\n" >> index.rst
        for f in `find . -type f -name "_index.md"`
        do
            fileName=${f##*/}
            path=${f%/*}
            dos2unix $f
            OLD_IFS="$IFS"
            IFS=
            title=
            link=
            subTitle=
            subLink=
            cat $f | while read line
            do
                if [[ "$line" =~ ^#.* ]]; then
                    continue
                fi

                if [[ "$line" = "  - title: "* ]]; then
                    title=`echo "${line/  - title: /}"|sed -e 's/^[ \t]*//g' -e 's/[ \t]*$//g' -e $'s/\'//g'`
                fi

                if [[ "$line" = "      - title: "* ]]; then
                    subTitle=`echo "${line/      - title: /}"|sed -e 's/^[ \t]*//g' -e 's/[ \t]*$//g' -e $'s/\'//g'`
                fi

                if [[ "$line" = "    link:"* ]]; then
                    link=`echo "${line/    link:/}"|sed -e 's/^[ \t]*//g' -e 's/[ \t]*$//g' -e $'s/\'//g'`
                    indexFile=`echo "$title"|sed 's/[ ][ ]*/_/g'`
                    echo -e "   $path/$link/index" >> index.rst
                    title=
                    link=
                 fi

                 if [[ "$line" = "        link:"* ]]; then
                     subLink=`echo "${line/        link:/}"|sed -e 's/^[ \t]*//g' -e 's/[ \t]*$//g' -e $'s/\'//g'`
                     subIndexFile=`echo "$title"|sed 's/[ ][ ]*/_/g'`
                     if [ ! -f "${subIndexFile}.rst" ]; then
                         echo "============================" >> "${path}/${subIndexFile}.rst"
                         echo $title >> "$path/$subIndexFile.rst"
                         echo "============================" >> "${path}/${subIndexFile}.rst"
                         echo -e ".. toctree::\n   :maxdepth: 1\n   :titlesonly:\n" >> "$path/${subIndexFile}.rst"
                         echo -e "   $path/$subIndexFile" >> "$path/index.rst"
                      fi
                      echo -e "   $path/$subLink/index" >> "$path/$subIndexFile.rst"
                      subTitle=
                      subLink=
                  fi
            done
            IFS=$OLD_IFS
        done

        for f in `find . -type f -name "index.md"`
        do
            path=${f%/*}
            echo "============================" >> "${path}/index.rst"
            echo `cat $f|grep -oP '^title: .*'|awk -F ": " '{print $2}'` >> "${path}/index.rst"
            echo "============================" >> "${path}/index.rst"
            echo -e ".. toctree::\n   :maxdepth: 1\n   :titlesonly:\n\n   index.md" >> "${path}/index.rst"
            pandoc $f --wrap=none -o "$f.rst"
            rm $f
        done

        cd ..
        make latexpdf
        mkdir -p pdf
        cp _build/latex/*.pdf ./public/pdf/apache_$1_docs_$lang.pdf
        echo "apache_$1_docs_$lang.pdf"
        make clean
        rm -rf {_build,source}
    done
}

prepare
generate_pdf "shenyu"
