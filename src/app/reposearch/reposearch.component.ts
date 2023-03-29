import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm,FormControl , FormGroup, Validators} from '@angular/forms';
import { ApiservicesService } from '../services/apiservices.service';
@Component({
  selector: 'app-reposearch',
  templateUrl: './reposearch.component.html',
  styleUrls: ['./reposearch.component.css']
})
export class ReposearchComponent implements OnInit {

  type_ddl : any = [
    {value:'Public', name : 'Public'},
    {value:'Fork', name : 'Fork'},
    {value:'Private', name : 'Private'},
    {value:'Archived', name : 'Archived'},
    {value : 'Templet' , name : 'Templet'}
  ]
  
  languages_ddl :any =[];
 
  repositories: any = [];
  repos_username:any;
  temprepo:any = [];
  searchText :any ='';
  searchlanguage :any;
  searchType:any;
  isSubmitted = false;
  isDisplay = false
  

  userForm = new FormGroup({
    username : new FormControl('',Validators.required)
  })
  constructor(public apiservice :ApiservicesService) { }

  ngOnInit(): void {
  }

  searchGitRepo(){
    this.isSubmitted = true
    if(this.userForm.valid){
    let searchText: any = this.userForm.value.username;
    this.apiservice.getRepositoryResponse(searchText).then(
      (response) => {
        console.log(response);
        this.repos_username = this.userForm.value.username
        this.repositories = response;
        this.temprepo = response;
        this.isDisplay = true;
        console.log(this.temprepo)
        if(this.repositories.length > 0)
        this.generate_language_ddl();
      },
      (error) => {
        console.log(error);
      }
    );
    }
  }


  async generate_language_ddl(){
          //map lang value from repo then remove mutiple entry and then map as ddl formate and then filter data and remove null values
          this.languages_ddl = [...new Set(this.temprepo.map((i:any )=> i.language))].map((i:any )=> ({ value: i, name: i})).filter((i)=> i.value != null);
  }


 // search function for every search operation 
 // filter on 3 fields means (2*3)+1 = 7 combination of filter 
  search(){+
    console.log("search") 
      if (this.searchText === '' && (this.searchlanguage == null || this.searchlanguage == undefined) && this.searchType == null) {
        this.repositories = []
        this.repositories = this.temprepo;

      }else if(this.searchText != '' && (this.searchlanguage == null || this.searchlanguage == undefined) && this.searchType == null){
        const res = this.temprepo.filter((o:any) =>
        o['name'].toLowerCase().includes(this.searchText.toLowerCase())
      )
      this.repositories = res
      }else if(this.searchText === '' && (this.searchlanguage != null && this.searchlanguage != undefined) && this.searchType == null){
        const res = this.temprepo.filter((o:any) =>
        o['language'] == this.searchlanguage
      )
      this.repositories = res
      }else if(this.searchText === '' && (this.searchlanguage == null && this.searchlanguage == undefined) && this.searchType != null){
        
        const res = this.temprepo.filter((o:any) =>
        o[this.findTypekey()] == this.findTypevalue()
      )
      this.repositories = res
      }else if(this.searchText != '' && (this.searchlanguage != null && this.searchlanguage != undefined) && this.searchType == null){
        const res = this.temprepo.filter((o:any) =>
        o['name'].toLowerCase().includes(this.searchText.toLowerCase()) &&
        o['language'] == this.searchlanguage
      )
      this.repositories = res
      }else if(this.searchText != '' && (this.searchlanguage == null || this.searchlanguage == undefined) && this.searchType != null){
        const res = this.temprepo.filter((o:any) =>
        o['name'].toLowerCase().includes(this.searchText.toLowerCase()) &&
        o[this.findTypekey()] == this.findTypevalue()
        )
      this.repositories = res

      }else if(this.searchText == '' && (this.searchlanguage != null && this.searchlanguage != undefined) && this.searchType != null){
        const res = this.temprepo.filter((o:any) =>
        o['language'] == this.searchlanguage &&
        o[this.findTypekey()] == this.findTypevalue()
      )
      this.repositories = res
      }
      else {
        const res = this.temprepo.filter((o:any) =>
          o['name'].toLowerCase().includes(this.searchText.toLowerCase()) &&
          o['language'] == this.searchlanguage &&
          o[this.findTypekey()] == this.findTypevalue()
        )
        this.repositories = res
      }
    }

  // different key for type filter so i used this methode
    findTypekey(){
      if(this.searchType == 'Private'){
        return 'private'
      }else if(this.searchType == 'Public'){
        return 'private'
      }else if(this.searchType == 'Fork'){
        return 'fork'
      }else if(this.searchType == 'Archived'){
        return 'archived'
      }else if(this.searchType == 'Templet'){
        return 'is_template'
      }else{
        return 'private'
      }
    }

    // for filter value of type
    findTypevalue(){
      if(this.searchType == 'Public'){
        return false;
      }else{
        return true;
      }
    }
  }

  




