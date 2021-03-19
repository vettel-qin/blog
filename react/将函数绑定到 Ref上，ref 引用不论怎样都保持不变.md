```
import { useState, useRef } from 'react';

function ArticleTypeSetting({getTextLen}) {
  console.log(" --- ArticleTypeSetting 组件重新渲染 --- ");
  const [articleType, setArticleType] = useState('前端');

  const handleChange = (e) => {
    setArticleType(e.target.value);
    console.log(  "ArticleTypeSetting埋点 >>> 切换类型，当前「标题」和「内容」长度：", getTextLen.current() );
  }
  return (
    <>
    <div>文章类型组件，当选择类型时上报「标题」和「内容」长度</div>
    <div>
      {['前端', '后端'].map((type, index) => (
        <div key={index}>  
          <input  type="radio" value={type} checked={articleType === type} onChange={handleChange}  /> 
          {type} 
        </div>
      ))}
    </div>
    </>
  )
}

const MemoArticleTypeSetting = memo(ArticleTypeSetting)

function App() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [other, setOther] = useState('');

  const getTextLenRef = useRef(() => [0, 0]);
  getTextLenRef.current = () => {
    return [title.length, content.length]
  }

  const report = () => {
    const [titleLen, contentLen] = getTextLenRef.current();
    if (contentLen > 0) {
      console.log(`埋点 >>> 标题长度 ${titleLen}, 内容长度 ${contentLen}`);
    }
  }

  /**
  * 副作用
  * 当标题长度变化时，上报
  */
  useEffect(() => {
     report();
   }, [title, content])

  return(
    <>
    文章标题 <input value={title} onChange={(e) => setTitle(e.target.value)} />
      
    文章内容  <input value={content} onChange={(e) => setContent(e.target.value)} />
      
    其他不相关状态： <input value={other} onChange={(e) => setOther(e.target.value)} />

    <MemoArticleTypeSetting getTextLen={getTextLenRef} />
    </>
  ) 
}

export default App;
```