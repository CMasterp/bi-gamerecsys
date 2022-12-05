from IPython.display import display
import os
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.decomposition import TruncatedSVD
from scipy.sparse.linalg import svds
import json
import urllib
import sys
import re
from sklearn.metrics.pairwise import cosine_similarity
import warnings
warnings.simplefilter(action='ignore', category=FutureWarning)

SteamURL=pd.read_csv('SteamGameData.csv')
SteamURL=SteamURL.set_index(keys='name')
SteamURL=SteamURL.loc[:,['url']]

steamid = 111111
#url = 'https://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=C43A6789C9607462F9F6BC3601E50B00&steamid='+steamid+'&include_appinfo=1&include_played_free_games=1&format=json'

#result_obj = urllib.request.urlopen(url)

['{"nbrMins":0,"name":"Team Sonic Racing™","appid":"","gameInfos":{"url":"https://cdn.cloudflare.steamstatic.com/steam/apps/785260/header.jpg","type":"app","name":"Team Sonic Racing™","desc_snippet":"Team Sonic Racing combines the best elements of arcade and fast-paced competitive style racing as you face-off with friends in intense multiplayer racing.","genre":"Racing"}}}}', '"nbrMins":0,"name":"PLAYERUNKNOWN\'S BATTLEGROUNDS","appid":"","gameInfos":{"url":"https://cdn.cloudflare.steamstatic.com/steam/apps/578080/header.jpg","type":"app","name":"PLAYERUNKNOWN\'S BATTLEGROUNDS","desc_snippet":"PLAYERUNKNOWN\'S BATTLEGROUNDS is a battle royale shooter that pits 100 players against each other in a struggle for survival. Gather supplies and outwit your opponents to become the last person standing.","genre":"Action,Adventure,Massively Multiplayer"}', '"nbrMins":0,"name":"They Are Billions","appid":"","gameInfos":{"url":"https://cdn.cloudflare.steamstatic.com/steam/apps/644930/header.jpg","type":"app","name":"They Are Billions","desc_snippet":"They Are Billions is a Steampunk strategy game set on a post-apocalyptic planet. Build and defend colonies to survive against the billions of the infected that seek to annihilate the few remaining living humans. Can humanity survive after the zombie apocalypse?","genre":"Strategy,Early Access"}}']


#result_json = result_obj.read()
#result_dict = json.loads(sys.argv[1])
result_dict = sys.argv[1].split('},{')
result_dictt = []
i = 0
for tmp in result_dict:
    if (i == 0):
        result_dict[i] = result_dict[i] + '}'
    else:
        result_dict[i] = '{' + result_dict[i] + '}'
    i = i + 1
print(result_dict)
i = 0
for tmp in result_dict:
    result_dictt.append(json.loads(result_dict[i]))
    i = i + 1
print(result_dictt)
sys.exit()
# 빈 리스트를 만들자
appid_list = []
title_list = []
playtime_list = []
#필요한 데이터만 appid, title, total_playtime
for tmp in result_dict:
    appid_list.append(tmp['appid'])
    title_list.append(re.sub(r"[^\uAC00-\uD7A30-9a-zA-Z\s]", "",(tmp['name'].lower()).replace(' ','')))
    playtime_list.append(round(tmp['nbrMins']/60,1))
# 프린트문으로 list가 잘만들어졌는지 확인해보고
print("GOOD NAH")
#print(title_list)
#print(playtime_list)
# 이상 없으면 데이터 프레임으로 만들어주자.
df = pd.DataFrame({
    'rank': appid_list,
    'title': title_list,
    'salesAmt': playtime_list
})
df.to_csv('userDataset.csv')

UserGamePlaytime = pd.read_csv('Presteam-200k.csv')
# preprocessing get rid of play state
UserGamePlaytime = UserGamePlaytime.loc[:,['userID','Game','hoursPlayed']]
UserGamePlaytime.dropna(inplace=True)
# preprocessing game name
gamelist=[]
for titles in UserGamePlaytime['Game']:
    gamelist.append(re.sub(r"[^\uAC00-\uD7A30-9a-zA-Z\s]", "",titles.lower().replace(' ','')))
UserGamePlaytime['Game'] = gamelist
# save as csv
UserGamePlaytime.to_csv('Presteam-200k-3.csv')

# preprocess given user dataset and merge
Idlist=[]
for id in df['rank'] :
    Idlist.append(steamid)
df['rank'] = Idlist
#display(df)
df.rename(columns={'rank' : 'userID', 'title' : 'Game', 'salesAmt' : 'hoursPlayed'},inplace=True)
UserDataset = df
frames = [UserGamePlaytime,UserDataset]

UserGamePlaytime = pd.concat(frames)
#display(UserGamePlaytime)

# colaborative filtering

# log hourspLayed
#UserGamePlaytime['hoursPlayed']=np.log(UserGamePlaytime['hoursPlayed'])

# make pivot table
UserGamePlaytimePivot = UserGamePlaytime.pivot_table('hoursPlayed', index = 'userID', columns='Game')
UserGamePlaytimePivot.fillna(0, inplace=True)

# make matirx
#print(UserGamePlaytimePivot)
matrix = UserGamePlaytimePivot.values
playtimeMean = np.mean(matrix, axis=1)
matrixPlayTimeMean = matrix - playtimeMean.reshape(-1,1)

# make into dataframe
pd.DataFrame(matrixPlayTimeMean, columns = UserGamePlaytimePivot.columns,index=UserGamePlaytimePivot.index)
# svd matrix
U, sigma, Vt = svds(matrixPlayTimeMean,k=12)
sigma=np.diag(sigma)

svdGamePlaytime = np.dot(np.dot(U, sigma), Vt) + playtimeMean.reshape(-1,1)
dfSvdPredict = pd.DataFrame(svdGamePlaytime, columns = UserGamePlaytimePivot.columns,index=UserGamePlaytimePivot.index)
#display(dfSvdPredict)
prediction=dfSvdPredict.loc[steamid].sort_values(ascending=False)
prediction=pd.DataFrame(prediction)


df=df.set_index(keys='Game')
#print(df)
DFmerge = pd.merge(df,prediction,
    how='outer',
    left_index=True,
    right_index=True,
    indicator=True
    )
DFmerge[DFmerge['_merge'] == 'both'].index
#print(DFmerge[DFmerge['_merge'] == 'both'].index)
prediction_eq=prediction[prediction.index.isin(DFmerge[DFmerge['_merge'] !='both'].index)]
#print(prediction_eq)

URLmerge=pd.merge(prediction_eq,SteamURL,
    how='outer',
    left_index=True,
    right_index=True,
    indicator=True
    )
URLmerge=URLmerge.sort_values(steamid,ascending=False)
#print(URLmerge)
finalResult = URLmerge[URLmerge.index.isin(URLmerge[URLmerge['_merge'] == 'both'].index)]
finalResult=finalResult.loc[:,['url']]
display(finalResult[0:10])
