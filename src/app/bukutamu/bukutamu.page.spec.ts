import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BukutamuPage } from './bukutamu.page';

describe('BukutamuPage', () => {
    let component: BukutamuPage;
    let fixture: ComponentFixture<BukutamuPage>;

    beforeEach(async(() => {
        fixture = TestBed.createComponent(BukutamuPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});

