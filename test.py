import os
folder = "./ace"
dir = os.listdir(folder)
for i in dir:
    if "theme" in i:
        print("<option value='"+i.replace(".js", "").replace("theme-", "") + "'>"+i.replace(".js", "").replace("theme-", "")+"</option>")