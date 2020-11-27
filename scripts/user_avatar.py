import urllib.request

from lxml import etree


def create_request(page):
    # base_url = 'http://sc.chinaz.com/tupian/qinglvtupian'  #站长图片
    #站长
    # if page == 1:
    #     url = base_url + '.html'
    # else:
    #     url = base_url + '_' + str(page) + '.html'


    #头像
    url = 'http://www.jj20.com/tx/meinu/list_221_%s.html'%(page)  #美女头像网
    #url = 'http://www.jj20.com/tx/nansheng/list_216_%s.html'%(page)  #男生头像网
    #url = 'http://www.jj20.com/tx/dongman/list_219_%s.html'%(page)  #动漫头像网
    # url = 'http://www.jj20.com/tx/katong/list_220_%s.html'%(page)  #动漫头像网
    print(url)

    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.120 Safari/537.36'
    }
    request = urllib.request.Request(url=url,headers=headers)
    return request


def get_content(request):
    response = urllib.request.urlopen(request)
    content = response.read().decode('gb2312','ignore')
    return content

def down_load(content):
    tree = etree.HTML(content)
    # src_list = tree.xpath('//div[@id="container"]//a/img/@src2')
    src_list = tree.xpath('/html/body/div[7]/ul//a/img/@src')#/html/body/div[7]/ul/li[1]/a/img/@src

    return src_list
    # 下面是下载的步骤
    # alt_list = tree.xpath('//div[@id="container"]//a/img/@alt')
    # for i in range(len(src_list)):
    #     src = src_list[i]
    #     alt = alt_list[i]
    #     print(src)
        # filename = './qinglv/'+alt + '.jpg'


        # urllib.request.urlretrieve(url=src,filename=filename)

def run(start_page,end_page):
    img_src_list = []
    for page in range(start_page,end_page+1):
        request = create_request(page)
        content = get_content(request)
        img_src_list.extend(down_load(content))
    return img_src_list

if __name__ == '__main__':
    start_page = int(input('请输入起始页码'))  #爬取四页1--4
    end_page = int(input('请输入结束页码'))
    print(run(start_page, end_page))