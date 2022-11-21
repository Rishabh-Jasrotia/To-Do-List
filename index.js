window.onload = function()
{
    var list={}
    function loadList()
    {
        let sl = JSON.parse(localStorage.getItem('sl'));
        if(sl===null)
        {
            localStorage.setItem('sl', JSON.stringify(list));
        }
        let l=document.getElementById("td-list");
        for(let keys of Object.keys(sl))
        {
            list[sl[Number(keys)]]=Number(keys);
            l.innerHTML+=`
                <div class="td-li">
                    <div class="td-btn">
                        <button class="btn-x">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                        <button class="btn-up">
                            <span class="material-symbols-outlined">north</span>
                        </button>
                        <button class="btn-dwn">
                            <span class="material-symbols-outlined">south</span>
                        </button>
                    </div>
                    <div class="td-text">
                        ${sl[keys]}
                    </div>
                </div>`;
        }
        for(let i of document.querySelectorAll(".btn-x"))
        {
            i.addEventListener('click',function(){del(this)});
        }
        for(let i of document.querySelectorAll(".btn-up"))
        {
            i.addEventListener('click',function(){moveUp(this)});
        }
        for(let i of document.querySelectorAll(".btn-dwn"))
        {
            i.addEventListener('click',function(){moveDown(this)});
        }
    }
    loadList();
    function storeList()
    {
        let sl={}
        for(let key of Object.keys(list))
            sl[list[key]]=key;
        localStorage.setItem('sl', JSON.stringify(sl));
    }
    document.querySelector("#input-sec button").addEventListener('click',function(){
        let inp=document.querySelector("#input-sec input");
        let s=inp.value;
        inp.value="";
        add(s);
    });
    document.querySelector("#input-sec input").addEventListener('keypress',function(e){
        if(e.key==="Enter")
        {
            let inp=document.querySelector("#input-sec input");
            let s=inp.value;
            inp.value="";
            add(s);
        }
    });
    function add(s)
    {
        if(s==="")
            return;
        let maxP=0;
        for(let key of Object.keys(list))
        {
            if(list[key]>maxP)
            maxP=list[key];
        }
        list[s]=maxP+1;
        let l=document.getElementById("td-list");
        l.innerHTML+=`
                <div class="td-li">
                    <div class="td-btn">
                        <button class="btn-x">
                            <span class="material-symbols-outlined">delete</span>
                        </button>
                        <button class="btn-up">
                            <span class="material-symbols-outlined">north</span>
                        </button>
                        <button class="btn-dwn">
                            <span class="material-symbols-outlined">south</span>
                        </button>
                    </div>
                    <div class="td-text">
                        ${s}
                    </div>
                </div>`;

        for(let i of document.querySelectorAll(".btn-x"))
        {
            i.addEventListener('click',function(){del(this)});
        }
        for(let i of document.querySelectorAll(".btn-up"))
        {
            i.addEventListener('click',function(){moveUp(this)});
        }
        for(let i of document.querySelectorAll(".btn-dwn"))
        {
            i.addEventListener('click',function(){moveDown(this)});
        }
        storeList();
    }
    function del(a)
    {   
        let n=a.parentNode.parentNode;
        let k= n.querySelector(".td-text").innerText;
        for(let key of Object.keys(list))
        {
            if(list[key]>list[k])
                list[key]-=1;
        }
        delete list[k];
        n.remove();
        storeList();
    }
    function moveUp(a)
    {
        let ele=a.parentNode.parentNode;
        let k=ele.querySelector(".td-text").innerText;
        for(let key of Object.keys(list))
        {
            if(list[key]==list[k]-1)
                list[key]+=1;
        }
        list[k]-=1;
        if(ele.previousElementSibling)
            ele.parentNode.insertBefore(ele,ele.previousElementSibling);
        storeList();
    }
    function moveDown(a)
    {
        let ele=a.parentNode.parentNode;
        let k=ele.querySelector(".td-text").innerText;
        for(let key of Object.keys(list))
        {
            if(list[key]==list[k]+1)
                list[key]-=1;
        }
        list[k]+=1; 
        if(ele.nextElementSibling)
            ele.parentNode.insertBefore(ele.nextElementSibling,ele);
        storeList();
    }
}