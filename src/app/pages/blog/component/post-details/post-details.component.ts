import { Component, inject, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { EPostSectionType } from '@Shared/enum/EPostSectionType';
import { ISectionContent } from '@Shared/interface/ISectionContent';
import { AvatarModule } from 'primeng/avatar';
import { AudioViewComponent } from './audio-view/audio-view.component';
import { StatementComponent } from './statement/statement.component';
import { TextViewComponent } from './text-view/text-view.component';
import { VideoViewComponent } from './video-view/video-view.component';

@Component({
  selector: 'app-post-details',
  imports: [StatementComponent, TextViewComponent, VideoViewComponent, AudioViewComponent, AvatarModule],
  templateUrl: './post-details.component.html',
  styleUrl: './post-details.component.scss'
})
export class PostDetailsComponent implements OnInit {
  private titleService = inject(Title);

  public sectionContents: ISectionContent[] = [
    {
      id: null,
      heading: 'Microsoft just opened the flood gates…',
      mediaUrl: 'https://youtu.be/NIgrGqmoeHs',
      description: 'Microsoft just made GitHub Copilot free and open source software under the MIT License. As of today, you can fork it, modify it and even build your own billion dollar competitor without going to prison.',
      sectionType: EPostSectionType.VIDEO
    },
    {
      id: null,
      mediaUrl: 'https://open.spotify.com/track/31VNCmwspR7nVJ6kruUuJt?si=7665c318ea794503',
      description: 'Đừng làm trái tim anh đau song description',
      sectionType: EPostSectionType.AUDIO
    },
    {
      id: null,
      textContent:
        '<p>ERROR&nbsp;Error:&nbsp;NG0951:&nbsp;Child&nbsp;query&nbsp;result&nbsp;is&nbsp;required&nbsp;but&nbsp;no&nbsp;value&nbsp;is&nbsp;available.&nbsp;Find&nbsp;more&nbsp;at&nbsp;<a href="https://angular.dev/errors/NG0951" rel="noopener noreferrer" target="_blank">https://angular.dev/errors/NG0951</a></p><p>&nbsp;&nbsp;&nbsp;&nbsp;Angular&nbsp;5</p><p>&nbsp;&nbsp;&nbsp;&nbsp;ngAfterViewInit&nbsp;login.component.ts:34</p>',
      sectionType: EPostSectionType.TEXT
    },
    {
      id: null,
      textContent:
        '<p>Get&nbsp;ready&nbsp;for&nbsp;two&nbsp;days&nbsp;of&nbsp;open&nbsp;source&nbsp;magic&nbsp;at&nbsp;<a href="https://githubuniverse.com/?utm_source=Blog&amp;utm_medium=GitHub&amp;utm_campaign=OSZ/" rel="noopener noreferrer" target="_blank">GitHub&nbsp;Universe&nbsp;2024</a>,&nbsp;where&nbsp;innovation&nbsp;meets&nbsp;inspiration&nbsp;at&nbsp;San&nbsp;Francisco’s&nbsp;iconic&nbsp;Fort&nbsp;Mason.&nbsp;On&nbsp;October&nbsp;28-29,&nbsp;we’re&nbsp;transforming&nbsp;a&nbsp;dedicated&nbsp;area,&nbsp;the&nbsp;Open&nbsp;Source&nbsp;Zone,&nbsp;into&nbsp;a&nbsp;hotbed&nbsp;of&nbsp;groundbreaking&nbsp;ideas,&nbsp;live&nbsp;demos,&nbsp;and&nbsp;community&nbsp;connections&nbsp;featuring&nbsp;rising&nbsp;stars&nbsp;from&nbsp;our&nbsp;<a href="https://accelerator.github.com/" rel="noopener noreferrer" target="_blank">GitHub&nbsp;Accelerator&nbsp;program</a>,&nbsp;champions&nbsp;from&nbsp;our&nbsp;<a href="https://maintainers.github.com/auth/signin" rel="noopener noreferrer" target="_blank">Maintainer&nbsp;Community</a>,&nbsp;friends&nbsp;from&nbsp;our&nbsp;<a href="https://resources.github.com/github-fund/" rel="noopener noreferrer" target="_blank">GitHub&nbsp;Fund</a>&nbsp;,&nbsp;and&nbsp;passionate&nbsp;creators&nbsp;from&nbsp;around&nbsp;the&nbsp;globe.</p><p>Let’s&nbsp;take&nbsp;a&nbsp;closer&nbsp;look&nbsp;at&nbsp;some&nbsp;of&nbsp;the&nbsp;stars&nbsp;of&nbsp;the&nbsp;Open&nbsp;Source&nbsp;Zone&nbsp;🔎</p><h2>A-Frame:&nbsp;Create&nbsp;VR&nbsp;magic&nbsp;with&nbsp;just&nbsp;a&nbsp;few&nbsp;lines&nbsp;of&nbsp;code</h2><p><a href="https://aframe.io/" rel="noopener noreferrer" target="_blank">A-Frame</a>&nbsp;is&nbsp;your&nbsp;gateway&nbsp;to&nbsp;effortlessly&nbsp;creating&nbsp;stunning&nbsp;VR&nbsp;experiences&nbsp;directly&nbsp;in&nbsp;your&nbsp;browser&nbsp;with&nbsp;just&nbsp;a&nbsp;few&nbsp;lines&nbsp;of&nbsp;code.&nbsp;Whether&nbsp;you’re&nbsp;a&nbsp;web&nbsp;developer,&nbsp;designer,&nbsp;or&nbsp;VR&nbsp;enthusiast—your&nbsp;next&nbsp;mind-blowing&nbsp;project&nbsp;is&nbsp;just&nbsp;a&nbsp;<code>&lt;script&gt;</code>&nbsp;tag&nbsp;away!</p>',
      sectionType: EPostSectionType.TEXT
    },
    {
      id: null,
      textContent:
        '<p>Find&nbsp;out&nbsp;how&nbsp;A-Frame&nbsp;makes&nbsp;it&nbsp;easy&nbsp;for&nbsp;developers&nbsp;of&nbsp;all&nbsp;levels&nbsp;to&nbsp;create&nbsp;immersive&nbsp;VR&nbsp;experiences&nbsp;with&nbsp;creator&nbsp;and&nbsp;maintainer,&nbsp;<a href="https://github.com/dmarcos" rel="noopener noreferrer" target="_blank">@dmarcos</a>.</p><p><strong>Did&nbsp;you&nbsp;know:</strong>&nbsp;A-Frame&nbsp;was&nbsp;recently&nbsp;<a href="https://github.blog/news-insights/company-news/2024-github-accelerator-meet-the-11-projects-shaping-open-source-ai/" rel="noopener noreferrer" target="_blank">selected&nbsp;for&nbsp;our&nbsp;GitHub&nbsp;Accelerator&nbsp;program&nbsp;earlier&nbsp;this&nbsp;year</a>.</p><h2>Home&nbsp;Assistant:&nbsp;Take&nbsp;control&nbsp;of&nbsp;your&nbsp;home—your&nbsp;way</h2><p><a href="https://www.home-assistant.io/" rel="noopener noreferrer" target="_blank">Home&nbsp;Assistant</a>&nbsp;is&nbsp;an&nbsp;open&nbsp;source&nbsp;platform&nbsp;for&nbsp;home&nbsp;automation&nbsp;that&nbsp;gives&nbsp;you&nbsp;complete&nbsp;control&nbsp;over&nbsp;your&nbsp;smart&nbsp;devices,&nbsp;with&nbsp;a&nbsp;strong&nbsp;emphasis&nbsp;on&nbsp;privacy&nbsp;and&nbsp;local&nbsp;management.&nbsp;Manage&nbsp;everything&nbsp;from&nbsp;lighting&nbsp;to&nbsp;climate&nbsp;control&nbsp;seamlessly—all&nbsp;from&nbsp;a&nbsp;single&nbsp;hub,&nbsp;without&nbsp;relying&nbsp;on&nbsp;the&nbsp;cloud.&nbsp;Setup&nbsp;and&nbsp;configure&nbsp;your&nbsp;own&nbsp;dashboards,&nbsp;cherry-picking&nbsp;from&nbsp;hundreds&nbsp;of&nbsp;community-built&nbsp;<a href="https://github.com/frenck/awesome-home-assistant?tab=readme-ov-file#themes" rel="noopener noreferrer" target="_blank">themes</a>,&nbsp;<a href="https://github.com/frenck/awesome-home-assistant?tab=readme-ov-file#custom-cards" rel="noopener noreferrer" target="_blank">cards</a>,&nbsp;and&nbsp;<a href="https://github.com/frenck/awesome-home-assistant?tab=readme-ov-file#custom-integrations" rel="noopener noreferrer" target="_blank">other&nbsp;integrations</a>.</p>',
      sectionType: EPostSectionType.TEXT
    }
  ];

  public get EPostSectionType(): typeof EPostSectionType {
    return EPostSectionType;
  }

  ngOnInit(): void {
    const postTitle = 'Do You Really Know Java?';

    this.titleService.setTitle(postTitle);
  }
}
