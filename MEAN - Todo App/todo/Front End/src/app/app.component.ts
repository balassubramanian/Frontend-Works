import { Component } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true, 
  imports: [HttpClientModule, CommonModule], 
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontend';
  todoList: any[] = [];

  constructor(private http: HttpClient) {}

  getTodoList() {
    this.http.get('http://localhost:8080/api/todolist')
      .subscribe((data: any) => {
        console.log(data); 
        this.todoList = data as any[];
      }, error => {
        console.error('Error fetching todo list:', error);
      });
  }

  addRecord() {
    var newTitle = (<HTMLInputElement>document.getElementById("nt")).value;
    var  newDescription = (<HTMLInputElement>document.getElementById("nd")).value;
    const fdata ={
      title: newTitle,
      description: newDescription
    };
    this.http.post('http://localhost:8080/api/todolist',fdata).subscribe(data=>{
      alert(data);
    })
  }

    delRecord() {
      var delTitle = (<HTMLInputElement>document.getElementById("del")).value;
      this.http.delete('http://localhost:8080/api/todolist/'+delTitle).subscribe(data=>{
        alert("Record deleted");
      })

    }
    /*
    this.http.create(data)
    .subscribe ({
      next: (res) =>{
        console.log(res);
      },
      error:(e) => console.error(e)
    });
    */
  
}
