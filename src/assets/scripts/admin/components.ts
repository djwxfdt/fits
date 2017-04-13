import Vue,{ ComponentOptions } from 'vue'
import Component from 'vue-class-component'
import axios from "axios"


@Component({
    template: require('./template/welcome.pug')(),
})
export class Welcome extends Vue {
}


@Component({
    template: require('./template/edit.pug')(),
})
export class Edit extends Vue {
    article:string = ""
    finished:boolean = false
    id:string
    previewUrl:string = ""

    $refs: {
        openBtn: any
     }

    send():void{
        this.finished = true
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
                }
            }
        })
    }
}
