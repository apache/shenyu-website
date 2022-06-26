
from io import TextIOWrapper
import os
import json
from functools import reduce
from typing import Dict, List, Tuple

class Document:
    def __init__(self, path: str) -> None:
        self.path = path
        if len(self.path.split("/")) == 1:
            self.relative_path = None
        elif len(self.path.split("/")) == 2:
            self.relative_path = self.path.split("/")[-1]
        else:
            self.relative_path = reduce(lambda x,y : f"{x}/{y}", self.path.split("/")[1:-1])
        self.name = self.path.split("/")[-1]

    @property
    def rankFromFile(self) -> int:
        return 1
    
    def dumps(self) -> Dict:
        return {}

    def writeIndexRst(self) -> None:
        pass
    

class Md(Document):
    def __init__(self, path: str, rank: int) -> None:
        super().__init__(path)
        self.rank = rank

    @property
    def rankFromFile(self) -> int:
        with open(self.path, mode="r") as f:
            lines = f.readlines()
        lines = [line for line in lines if line.startswith("sidebar_position: ")]
        if not lines:
            raise Exception(f"{self.path} do not have sidebar_position")
        # if "sidebar_position: 1", return 1
        return int(lines[0].split(":")[-1].strip())

    def dumps(self) -> Dict:
        return {
            "name": self.name,
            "path": self.path,
            "rank": self.rank
        }

    def writeIndexRst(self) -> None:
        pass


class Folder(Document):
    def __init__(self, path: str) -> None:
        super().__init__(path)
        self.props = None

        files_name: List[str] = os.listdir(self.path)
        files_full_name = [os.path.join(self.path, file_name) for file_name in files_name]

        folders_name = [name for name in files_full_name if os.path.isdir(name)]
        md_files_name = [name for name in files_full_name if name.endswith(".md") and os.path.isfile(name)] 

        self.folders: List[Folder] = []
        self.md_files: List[Md] = []
        self.sequence: List[Document] = [None] * (len(folders_name) + len(md_files_name))

        for folder_name in folders_name:
            # append folder
            folder = Folder(folder_name)
            self.folders.append(folder)
            self.sequence[folder.rankFromFile - 1] = folder

        for md_file_name in md_files_name:
            idx = Folder.getFirstPosEmpty(self.sequence)
            file = Md(md_file_name, rank=idx+1)
            self.md_files.append(file)
            if idx < len(self.sequence):
                self.sequence[idx] = file

    @staticmethod
    def getFirstPosEmpty(l: List):
        for idx, elem in enumerate(l):
            if not elem:
                return idx
        return len(l)
        
    @property
    def rankFromFile(self) -> int:
        if not self.props:
            self.loadCategory()
        if "position" not in self.props:
            raise Exception(f"{self.path}/_category_.json do not contain position")
        return int(self.props["position"])

    @property
    def labelFromFile(self) -> str:
        if not self.props:
            self.loadCategory()
        if "label" not in self.props:
            raise Exception(f"{self.path}/_category_.json do not contain label")
        return self.props["label"]

    def loadCategory(self):
        try:
            with open(f"{self.path}/_category_.json", mode="r") as f:
                res = f.read()
            self.props = json.loads(res)
        except FileNotFoundError as e:
            # only top don't include _category_.json 
            self.props = {"label": "Top", "position": 1}

    def dumps(self) -> Dict:
        return {
            "name": self.name,
            "path": self.path,
            "rank": self.rankFromFile,
            "label": self.labelFromFile,
            "contents": [doc.dumps() for doc in self.sequence]
        }

    def writeIndexRst(self) -> None:
        docs_name = []
        for doc in self.sequence:
            if type(doc) == Folder:
                docs_name.append(f"./{doc.name}/index")
                print(doc.dumps())
                doc.writeIndexRst()
            elif type(doc) == Md:
                docs_name.append(f"./{doc.name}")
        docs_name = [f"   {doc_name}\n" for doc_name in docs_name]

        print(docs_name, self.labelFromFile)
        index_pst_path = f"source/{self.relative_path}/index.rst" if self.relative_path else "source/index.rst"
        with open(index_pst_path, mode="w") as f:
            f.writelines([
                "============================\n",
                self.labelFromFile + "\n",
                "============================\n",
                ".. toctree::\n",
                "   :maxdepth: 1\n",
                "   :titlesonly:\n"
                "\n"
            ] + docs_name)


doc = Folder("docs")
print(json.dumps(doc.dumps(), indent=2))
doc.writeIndexRst()
