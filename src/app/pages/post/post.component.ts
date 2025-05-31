import { CommonModule, DatePipe } from '@angular/common';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Component, inject, OnInit, signal, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { FileUploadComponent } from '@Shared/component/file-upload/file-upload.component';
import { PAGINATION_DEFAULT, POST_STATUSES } from '@Shared/constant/common.constants';
import { BaseDestroyableDirective } from '@Shared/directive/base-destroyable';
import { EPostStatus } from '@Shared/enum/EPostStatus';
import { convertSortObjToQueryString, convertToSearchConditions } from '@Shared/helper/query-string.helper';
import { IPost } from '@Shared/interface/blog/IPost';
import { IPostSearchParam } from '@Shared/interface/blog/IPostSearchParam';
import { IRequestDeletePost } from '@Shared/interface/blog/IRequestDeletePost';
import { ResponsePost } from '@Shared/interface/blog/IResponsePost';
import { ISectionContent } from '@Shared/interface/blog/ISectionContent';
import { ICategory } from '@Shared/interface/category/ICategory';
import { ISearchCondition } from '@Shared/interface/common/ISearchCondition';
import { ISortParam } from '@Shared/interface/common/ISortParam';
import { ITag } from '@Shared/interface/tag/ITag';
import { BlogService } from '@Shared/service/blog.service';
import { CategoryService } from '@Shared/service/category.service';
import { TagService } from '@Shared/service/tag.service';
import { ValidationMessageComponent } from '@Shared/validation/validation-message/validation-message.component';
import ValidatorsCustom from '@Shared/validation/validators-custom';
import { NgxSpinnerService } from 'ngx-spinner';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { MultiSelectModule } from 'primeng/multiselect';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { ToolbarModule } from 'primeng/toolbar';
import { debounceTime, distinctUntilChanged, Subject, takeUntil } from 'rxjs';
import { PostBuilderComponent } from './post-builder/post-builder.component';

interface Column {
  field: string;
  header: string;
  customExportHeader?: string;
}

interface ExportColumn {
  title: string;
  dataKey: string;
}

@Component({
  selector: 'app-post',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    FormsModule,
    ButtonModule,
    ToolbarModule,
    InputTextModule,
    SelectModule,
    DialogModule,
    TagModule,
    InputIconModule,
    IconFieldModule,
    ConfirmDialogModule,
    PostBuilderComponent,
    EditorModule,
    MultiSelectModule,
    ReactiveFormsModule,
    DatePipe,
    ValidationMessageComponent,
    FileUploadComponent
  ],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss',
  providers: [ConfirmationService]
})
export class PostComponent extends BaseDestroyableDirective implements OnInit {
  @ViewChild('postBuilderComponent') postBuilderComponent!: PostBuilderComponent;
  @ViewChild('dt') dt!: Table;

  public posts = signal<ResponsePost[]>([]);
  public post!: IPost | null;
  public selectedPosts!: ResponsePost[] | [];
  public formGroup: FormGroup;

  public isLoading = signal(false);
  public postDialog: boolean = false;
  public submitted: boolean = false;

  public page: number = PAGINATION_DEFAULT.PAGE;
  public rows: number = PAGINATION_DEFAULT.ROWS;
  public totalRecords = PAGINATION_DEFAULT.TOTAL_RECORDS;
  public rowsPerPageOptions = PAGINATION_DEFAULT.ROWS_PER_PAGE_OPTIONS;
  public searchConditions: ISearchCondition[] = [];
  public sortParam?: ISortParam;
  public searchConditionsChanged: Subject<ISearchCondition[]> = new Subject();

  public exportColumns!: ExportColumn[];
  public cols!: Column[];

  public searchForm: FormGroup;

  public postStatusOptions = POST_STATUSES;
  public categoryOptions: ICategory[] = [];
  public tagOptions: ITag[] = [];

  public dialogConfigs = {
    modal: true,
    breakpoints: { '1536px': '98vw' },
    style: { width: '1536px' },
    draggable: false,
    resizable: false,
    showEffect: 'fade'
  };

  private readonly blogService = inject(BlogService);
  private readonly categoryService = inject(CategoryService);
  private readonly tagService = inject(TagService);
  private readonly messageService = inject(MessageService);
  private readonly confirmationService = inject(ConfirmationService);
  private readonly fb = inject(FormBuilder);
  private readonly spinner = inject(NgxSpinnerService);

  constructor() {
    super();
    this.formGroup = this.fb.group({
      id: new FormControl<string>(''),
      title: new FormControl<string>('', [Validators.required, Validators.maxLength(255)]),
      description: new FormControl<string>('', [ValidatorsCustom.editorRequired('Description is required')]),
      heroImage: new FormControl<string>('', [Validators.required]),
      status: new FormControl<string>('', [Validators.required]),
      category: new FormControl<string>('', [Validators.required]),
      tags: new FormControl<string[]>([], [Validators.required]),
      sections: this.fb.array<ISectionContent[]>([])
    });

    this.searchForm = this.fb.group({
      searchKeyword: new FormControl<string>('')
    });
  }

  ngOnInit() {
    this.loadExportCSVData();

    this.searchConditionsChanged.pipe(debounceTime(500)).subscribe((debouncedSearchConditions) => {
      this.searchConditions = debouncedSearchConditions;
      this.loadAll();
    });

    this.searchForm
      .get('searchKeyword')
      ?.valueChanges.pipe(debounceTime(500), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe(() => {
        this.page = 0;
        this.loadAll();
      });
  }

  public loadExportCSVData() {
    this.cols = [
      { field: 'id', header: 'Id', customExportHeader: 'Post Code' },
      { field: 'title', header: 'Title' },
      { field: 'heroImage', header: 'Image' },
      { field: 'category', header: 'Category' },
      { field: 'authorName', header: 'Author' },
      { field: 'lastUpdated', header: 'Updated On' },
      { field: 'status', header: 'Status' }
    ];

    this.exportColumns = this.cols.map((col) => ({ title: col.header, dataKey: col.field }));
  }

  public exportCSV(): void {
    this.dt.exportCSV();
  }

  public loadPosts(event: any): void {
    this.page = event?.first / event.rows;
    this.rows = event.rows;
    this.sortParam = {
      sortField: event.sortField,
      sortOrder: event.sortOrder
    };
    const newSearchConditions = convertToSearchConditions(JSON.stringify(event.filters));
    this.searchConditionsChanged.next(newSearchConditions);
  }

  public loadAll(): void {
    this.isLoading.set(true);
    const payload: IPostSearchParam = {
      searchConditions: this.searchConditions,
      page: this.page,
      size: this.rows,
      ...this.searchForm.getRawValue()
    };
    if (this.sortParam) {
      payload.sort = convertSortObjToQueryString(this.sortParam);
    }

    this.spinner.show();
    this.blogService.getAllPosts(payload).subscribe({
      next: (res: HttpResponse<ResponsePost[]>) => {
        if (res.body) {
          this.onSuccess(res.body, res.headers);
          this.spinner.hide();
        }
      },
      error: () => {
        this.isLoading.set(false);
        this.spinner.hide();
      }
    });
  }

  private onSuccess(posts: ResponsePost[] | [], headers: HttpHeaders): void {
    this.totalRecords = Number(headers.get('X-Total-Count'));
    this.posts.set(posts);
  }

  public openNew(): void {
    this.getCategoryOptions();
    this.getTagOptions();
    this.post = null;
    this.formGroup.reset();
    this.submitted = false;
    this.postDialog = true;
  }

  public editPost(post: ResponsePost): void {
    this.submitted = false;
    this.post = null;
    this.getCategoryOptions();
    this.getTagOptions();
    this.getPostDetails(post.id);
    this.postDialog = true;
  }

  public getPostDetails(id: string): void {
    this.blogService.getPostDetails(id).subscribe({
      next: (res: IPost) => {
        this.post = res;

        this.formGroup.patchValue({
          ...this.post
        });
      },
      error: () => console.error('Error fetching post details')
    });
  }

  public savePost(): void {
    this.submitted = true;

    if (this.formGroup?.invalid || this.postBuilderComponent?.formGroup?.invalid) {
      return;
    }

    const sectionForms = this.postBuilderComponent?.formGroup?.get('sections') as FormArray;

    const post: IPost = {
      ...this.formGroup.getRawValue(),
      sections:
        sectionForms?.controls.map((control, index) => ({
          ...control.value,
          position: index + 1
        })) ?? []
    };

    const isUpdate = !!this.post;
    const postObservable$ = isUpdate && this.post ? this.blogService.updatePost(this.post.id, post) : this.blogService.addPost(post);

    const successMsg = isUpdate ? 'Post Updated' : 'Post Created';
    const errorMsg = isUpdate ? 'Post Update Failed' : 'Post Creation Failed';

    this.spinner.show();
    postObservable$.subscribe({
      next: () => {
        this.resetFormAndReload(successMsg);
      },
      error: () => {
        this.spinner.hide();
        this.showToast('error', 'Error', errorMsg);
      }
    });

    this.post = null;
  }

  private resetFormAndReload(successMsg: string): void {
    this.page = PAGINATION_DEFAULT.PAGE;
    this.loadAll();
    this.hideDialog();
    this.showToast('success', 'Successful', successMsg);
  }

  public hideDialog(): void {
    this.postDialog = false;
    this.submitted = false;
  }

  public deleteSelectedPosts(): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the selected posts?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        icon: 'pi pi-check',
        severity: 'danger',
        outlined: true
      },
      rejectButtonProps: {
        icon: 'pi pi-times',
        severity: 'secondary',
        outlined: true
      },
      accept: () => {
        const ids: string[] = this.selectedPosts.map((post) => post?.id);
        this.handleDeletePost(ids, true);
      }
    });
  }

  public deletePost(post: ResponsePost): void {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete: ' + post?.title + '?',
      header: 'Confirm',
      icon: 'pi pi-exclamation-triangle',
      acceptButtonProps: {
        icon: 'pi pi-check',
        severity: 'danger',
        outlined: true
      },
      rejectButtonProps: {
        icon: 'pi pi-times',
        severity: 'secondary',
        outlined: true
      },
      accept: () => {
        const ids: string[] = [post?.id];
        this.handleDeletePost(ids);
      }
    });
  }

  private handleDeletePost(ids: string[], isMultiDelete: boolean = false) {
    const payload: IRequestDeletePost = {
      ids: ids
    };
    const message: string = isMultiDelete ? 'Posts' : 'Post';

    this.spinner.show();
    this.blogService.deletePosts(payload).subscribe({
      next: () => {
        this.page = PAGINATION_DEFAULT.PAGE;
        this.loadAll();
        this.selectedPosts = [];
        this.showToast('success', 'Successful', `${message} Deleted`);
      },
      error: () => {
        this.spinner.hide();
        this.showToast('error', 'Error', `${message} Deletion Failed`);
      }
    });
  }

  private getCategoryOptions() {
    this.categoryService.getCategoryOptions().subscribe({
      next: (res) => {
        this.categoryOptions = res;
      },
      error: () => console.error('Fetch category options failed')
    });
  }

  private getTagOptions() {
    this.tagService.getTagOptions().subscribe({
      next: (res) => {
        this.tagOptions = res;
      },
      error: () => console.error('Fetch tag options failed')
    });
  }

  public getSeverity(status: EPostStatus): string {
    switch (status) {
      case EPostStatus.PUBLISHED:
        return 'success';
      case EPostStatus.ARCHIVED:
        return 'warn';
      case EPostStatus.DRAFT:
        return 'secondary';
      default:
        return 'info';
    }
  }

  private showToast(severity: 'success' | 'error', summary: string, detail: string): void {
    this.messageService.add({
      key: 'global-toast',
      severity,
      summary,
      detail,
      life: 3000
    });
  }

  public onUploadFile(imageUrl: string) {
    this.formGroup.patchValue({
      heroImage: imageUrl
    });
  }
}
