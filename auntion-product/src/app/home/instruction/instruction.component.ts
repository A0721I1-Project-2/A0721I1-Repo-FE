import { Component, OnInit } from '@angular/core';
import { HomeService } from '../service/home.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../model/Question';
import { Topic } from 'src/app/model/Topic';

@Component({
  selector: 'app-instruction',
  templateUrl: './instruction.component.html',
  styleUrls: ['./instruction.component.css']
})
export class InstructionComponent implements OnInit {

  questions: Question[];
  topics: Topic[];

  constructor(private homeService: HomeService, private router: Router, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.listQuestion();
    this.listTopic();
    // console.log('asdadasdad' + this.questions);
  }

  listQuestion() {
    this.homeService.showListQuestion().subscribe(
      data => {
        this.questions = data;
        console.log('asddasda' + this.questions);
      }
    );
  }

  listTopic() {
    this.homeService.listTopic().subscribe(
      data => {
        this.topics = data;
      }
    )
  }

}