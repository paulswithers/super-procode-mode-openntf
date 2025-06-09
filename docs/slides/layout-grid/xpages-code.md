# ExtLib App Layout

```html
<xe:applicationLayout id="applicationLayout1">
    <xe:this.facets>
        <xc:ccLayout_Search xp:key="SearchBar" loaded="${pageController.showSearch}"></xc:ccLayout_Search>
        <xp:callback facetName="facetLeft" id="facetLeft" xp:key="LeftColumn">
        </xp:callback>
    </xe:this.facets>

    <xe:this.configuration>
        <xe:bootstrapResponsiveConfiguration
            titleBarName="#{applicationScope.title}"
            productLogo="/icon-ship-23.png" defaultNavigationPath="/home"
            navigationPath="${pageController.navigationPath}" banner="true"
            titleBar="true" titleBarLabel=" ">
            <xe:this.bannerApplicationLinks>

            </xe:this.bannerApplicationLinks>
            <xe:this.bannerUtilityLinks>
                <xe:basicLeafNode label="Check Full Text Index">
                    <xe:this.loaded><![CDATA[${pageController.userAdmin}]]></xe:this.loaded>
                    <xe:this.onClick><![CDATA[XSP.openDialog("#{id:FTIndex}");]]></xe:this.onClick>
                </xe:basicLeafNode>

                <xe:basicLeafNode label="Reload User Details"
                    submitValue="reloadDetails">
                </xe:basicLeafNode>

                <xe:basicLeafNode label="${userBean.commonName}"
                    submitValue="displayName">
                </xe:basicLeafNode>

                <xe:pageTreeNode label="Administration"
                    page="/Admin_Trips.xsp">
                    <xe:this.loaded><![CDATA[${javascript:userScope.get(@UserName()).get("isAdmin")}]]></xe:this.loaded>
                </xe:pageTreeNode>
                <xe:loginTreeNode label="Login">
                    <xe:this.loaded><![CDATA[${userBean.commonName=="Anonymous"}]]></xe:this.loaded>
                </xe:loginTreeNode>
                <!-- DOES NOT DO A REDIRECT -->
                <xe:basicLeafNode label="Logout" submitValue="logout">
                    <xe:this.loaded><![CDATA[${userBean.commonName!="Anonymous"}]]></xe:this.loaded>
                </xe:basicLeafNode>
            </xe:this.bannerUtilityLinks>
        </xe:bootstrapResponsiveConfiguration>
    </xe:this.configuration>
    <xp:callback facetName="facetMiddle" id="callback1"></xp:callback>
</xe:applicationLayout>
```

---

# Custom Controls

```html
<div class="lotusFrame">
    <xc:partLoginBar
        tab="#{javascript:compositeData.selectedTabLoginBar}">
        <xp:this.facets>
            <xc:ccLogin xp:key="LoginLinks"></xc:ccLogin>
        </xp:this.facets>
    </xc:partLoginBar>
    <a id="lotusMainContent" name="lotusMainContent"></a>
    <xc:partTabBar tab="#{javascript:compositeData.selectedTab}"></xc:partTabBar>
    <xc:partTitleBar
        mainTitle="#{javascript:compositeData.mainTitle}">
    </xc:partTitleBar>
    <div id="lotusMain" class="lotusMain">
        <div id="lotusColLeft" class="lotusColLeft">
            <xp:callback facetName="LeftSideBarControl"
                id="LeftSideBarControl">
            </xp:callback>
        </div>
        <!--end lotusColLeft-->
        <div id="lotusColRight" class="lotusColRight">
            <xp:callback facetName="RightSideBarControl"
                id="RighSideBarControl">
            </xp:callback>
        </div>
        <!--end lotusColRight-->
        <div id="lotusContent" class="lotusContent lotusForm">
            <xp:callback facetName="ContentControl"
                id="ContentControl">
            </xp:callback>
        </div>
        <!--end lotusContent-->
    </div>
    <!--end lotusMain-->
</div>
<!--end frame-->
<xc:partFooter
    loaded="${javascript:applicationScope.baseFooterColumns!=null;}">
</xc:partFooter>
```

---

# ExtLib Form

```html
<xe:formTable id="formTable1" formTitle="${compositeData.formTitle}"
    formDescription="${compositeData.formDesc}" disableErrorSummary="true"
    disableRowError="true" labelWidth="25%" labelPosition="left" fieldHelp="true">
    <xp:this.facets>
        <xp:callback facetName="facet_2" id="callback5" xp:key="footer"></xp:callback>
        <xp:div xp:key="header" themeId="SummaryInfo">
            <xp:this.loaded><![CDATA[${pageController.formData.editSummary != ""}]]></xp:this.loaded>
            <xp:div themeId="SummaryInfo" styleClass="lotusMessage2 lotusInfo">
                <xp:text escape="false" id="computedField1" value="${pageController.formData.editSummary}">
                </xp:text>
            </xp:div>

        </xp:div>

    </xp:this.facets>

    <xp:callback facetName="facet_1" id="callback1"></xp:callback>

    <xe:formRow id="formRow1">
        <xp:section id="section1" initClosed="true" header="Audit">
            <xp:this.loaded><![CDATA[${javascript:compositeData.docForm.getItemValueString("Audit") != "" && !compositeData.docForm.isEditable()}]]></xp:this.loaded>
            <xp:text escape="false" id="computedField2" value="#{compositeData.docForm.audit}">
                <xp:this.converter>
                    <xp:converter converterId="iterableNewLineConverter">
                    </xp:converter>
                </xp:this.converter>
            </xp:text>
        </xp:section>
    </xe:formRow>
</xe:formTable>
```