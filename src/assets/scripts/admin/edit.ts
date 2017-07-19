import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import axios from "axios"
const {translateError,CODE} = require('../../../utils/code.js')

@Component({
    template: require('./template/edit.pug')(),
})
export class Edit extends Vue {
    article:string = ""
    finished:boolean = false
    id:string
    previewUrl:string = ""
    title:string = '未命名标题'
    showBar:boolean = false
    full:boolean = false

    $refs: {
        openBtn: any
     }

    send():void{
        axios.post('/article/save',{article:this.article,id:this.id,title:this.title}).then(res=>{
            if(res.data.code && res.data.code == CODE.OK){
                this.finished = true
            }
        });
    }

    postDraft():any{
        return axios.post('/article/draft',{article:this.article,id:this.id});
    }

    saveDraft():void{

    }

    openPreview():void{
        window.open(this.previewUrl)
    }

    preview():void{
        this.postDraft().then(res=>{
            if(res.data.code){
                if(res.data.code == 1){
                    this.id = res.data.id
                    this.previewUrl = "/article/preview?id=" + this.id
                     this.$refs.openBtn.click();
                     this.full = false;

                }
            }
        })
    }

    fullScreen():void{
        this.full = !this.full
    }

    showCategory(){
        this.showBar = true
    }

    hideCategory(){
        this.showBar = false
    }

    created():void{
        if(this.$route.params["id"]){
            let id = this.$route.params["id"]
            axios.get('/article/' + id).then(res=>{
                if(res.data.code && res.data.code == CODE.OK){
                    let article = res.data.article
                    this.title = article.title
                    this.id = id
                    this.article = article.body

                    console.error(this.id)
                }
            });
        }
    }
}
