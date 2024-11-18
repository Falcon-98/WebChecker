import type * as types from './types';
import type { ConfigOptions, FetchResponse } from 'api/dist/core'
import Oas from 'oas';
import APICore from 'api/dist/core';
import definition from './openapi.json';

class SDK {
  spec: Oas;
  core: APICore;

  constructor() {
    this.spec = Oas.init(definition);
    this.core = new APICore(this.spec, 'securityscorecard/1.9.42 (api/6.1.2)');
  }

  /**
   * Optionally configure various options that the SDK allows.
   *
   * @param config Object of supported SDK options and toggles.
   * @param config.timeout Override the default `fetch` request timeout of 30 seconds. This number
   * should be represented in milliseconds.
   */
  config(config: ConfigOptions) {
    this.core.setConfig(config);
  }

  /**
   * If the API you're using requires authentication you can supply the required credentials
   * through this method and the library will magically determine how they should be used
   * within your API request.
   *
   * With the exception of OpenID and MutualTLS, it supports all forms of authentication
   * supported by the OpenAPI specification.
   *
   * @example <caption>HTTP Basic auth</caption>
   * sdk.auth('username', 'password');
   *
   * @example <caption>Bearer tokens (HTTP or OAuth 2)</caption>
   * sdk.auth('myBearerToken');
   *
   * @example <caption>API Keys</caption>
   * sdk.auth('myApiKey');
   *
   * @see {@link https://spec.openapis.org/oas/v3.0.3#fixed-fields-22}
   * @see {@link https://spec.openapis.org/oas/v3.1.0#fixed-fields-22}
   * @param values Your auth credentials for the API; can specify up to two strings or numbers.
   */
  auth(...values: string[] | number[]) {
    this.core.setAuth(...values);
    return this;
  }

  /**
   * If the API you're using offers alternate server URLs, and server variables, you can tell
   * the SDK which one to use with this method. To use it you can supply either one of the
   * server URLs that are contained within the OpenAPI definition (along with any server
   * variables), or you can pass it a fully qualified URL to use (that may or may not exist
   * within the OpenAPI definition).
   *
   * @example <caption>Server URL with server variables</caption>
   * sdk.server('https://{region}.api.example.com/{basePath}', {
   *   name: 'eu',
   *   basePath: 'v14',
   * });
   *
   * @example <caption>Fully qualified server URL</caption>
   * sdk.server('https://eu.api.example.com/v14');
   *
   * @param url Server URL
   * @param variables An object of variables to replace into the server URL.
   */
  server(url: string, variables = {}) {
    this.core.setServer(url, variables);
  }

  /**
   * Get all portfolios you have access to
   *
   */
  getPortfolios(): Promise<FetchResponse<200, types.GetPortfoliosResponse200>> {
    return this.core.fetch('/portfolios', 'get');
  }

  /**
   * Create a new portfolio
   *
   */
  postPortfolios(body: types.PostPortfoliosBodyParam): Promise<FetchResponse<200, types.PostPortfoliosResponse200>> {
    return this.core.fetch('/portfolios', 'post', body);
  }

  /**
   * Edit a portfolio
   *
   */
  putPortfoliosPortfolio_id(body: types.PutPortfoliosPortfolioIdBodyParam, metadata: types.PutPortfoliosPortfolioIdMetadataParam): Promise<FetchResponse<200, types.PutPortfoliosPortfolioIdResponse200>> {
    return this.core.fetch('/portfolios/{portfolio_id}', 'put', body, metadata);
  }

  /**
   * Delete a portfolio
   *
   */
  deletePortfoliosPortfolio_id(metadata: types.DeletePortfoliosPortfolioIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/portfolios/{portfolio_id}', 'delete', metadata);
  }

  /**
   * Get all companies in a portfolio
   *
   */
  getPortfoliosPortfolio_idCompanies(metadata: types.GetPortfoliosPortfolioIdCompaniesMetadataParam): Promise<FetchResponse<200, types.GetPortfoliosPortfolioIdCompaniesResponse200>> {
    return this.core.fetch('/portfolios/{portfolio_id}/companies', 'get', metadata);
  }

  /**
   * Add company to portfolio
   *
   * @throws FetchError<400, types.PutPortfoliosPortfolioIdCompaniesDomainResponse400> Bad Request
   * @throws FetchError<401, types.PutPortfoliosPortfolioIdCompaniesDomainResponse401> Unauthorized
   * @throws FetchError<403, types.PutPortfoliosPortfolioIdCompaniesDomainResponse403> User is not allowed to perform this action.
   * @throws FetchError<404, types.PutPortfoliosPortfolioIdCompaniesDomainResponse404> Portfolio not found
   * @throws FetchError<429, types.PutPortfoliosPortfolioIdCompaniesDomainResponse429> Too Many Requests
   */
  putPortfoliosPortfolio_idCompaniesDomain(metadata: types.PutPortfoliosPortfolioIdCompaniesDomainMetadataParam): Promise<FetchResponse<200, types.PutPortfoliosPortfolioIdCompaniesDomainResponse200>> {
    return this.core.fetch('/portfolios/{portfolio_id}/companies/{domain}', 'put', metadata);
  }

  /**
   * Remove company from portfolio
   *
   */
  deletePortfoliosPortfolio_idCompaniesDomain(metadata: types.DeletePortfoliosPortfolioIdCompaniesDomainMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/portfolios/{portfolio_id}/companies/{domain}', 'delete', metadata);
  }

  /**
   * Get all expanded risk events in a portfolio 
   *
   *  **Note: Requires access to ESG**
   *
   * @summary Get all expanded risk events in a portfolio
   */
  getPortfoliosPortfolio_idExpandedRisk(metadata: types.GetPortfoliosPortfolioIdExpandedRiskMetadataParam): Promise<FetchResponse<200, types.GetPortfoliosPortfolioIdExpandedRiskResponse200> | FetchResponse<number, types.GetPortfoliosPortfolioIdExpandedRiskResponseDefault>> {
    return this.core.fetch('/portfolios/{portfolio_id}/expanded-risk', 'get', metadata);
  }

  /**
   * Get all scorecard tags
   *
   * @summary Get all scorecard tags
   */
  getScorecardTags(): Promise<FetchResponse<200, types.GetScorecardTagsResponse200>> {
    return this.core.fetch('/scorecard-tags', 'get');
  }

  /**
   * Create a scorecard tag
   *
   * @summary Create a scorecard tag
   */
  postScorecardTags(body: types.PostScorecardTagsBodyParam): Promise<FetchResponse<200, types.PostScorecardTagsResponse200>> {
    return this.core.fetch('/scorecard-tags', 'post', body);
  }

  /**
   * Deletes a list of tags by the given ids in a single request
   *
   * @summary Deletes a list of tags by the given ids in a single request
   */
  postScorecardTagsBulkDelete(body: types.PostScorecardTagsBulkDeleteBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/scorecard-tags/bulk-delete', 'post', body);
  }

  /**
   * Create a new scorecard tag group
   *
   * @summary Create a new scorecard tag group
   */
  postScorecardTagsGroups(body: types.PostScorecardTagsGroupsBodyParam): Promise<FetchResponse<200, types.PostScorecardTagsGroupsResponse200>> {
    return this.core.fetch('/scorecard-tags/groups', 'post', body);
  }

  /**
   * Get all scorecard tag groups
   *
   * @summary Get all scorecard tag groups
   */
  getScorecardTagsGroups(): Promise<FetchResponse<200, types.GetScorecardTagsGroupsResponse200>> {
    return this.core.fetch('/scorecard-tags/groups', 'get');
  }

  /**
   * Edit a scorecard tag group
   *
   * @summary Edit a scorecard tag group
   */
  putScorecardTagsGroupsId(body: types.PutScorecardTagsGroupsIdBodyParam, metadata: types.PutScorecardTagsGroupsIdMetadataParam): Promise<FetchResponse<200, types.PutScorecardTagsGroupsIdResponse200>> {
    return this.core.fetch('/scorecard-tags/groups/{id}', 'put', body, metadata);
  }

  /**
   * Get a scorecard tag group
   *
   * @summary Get a scorecard tag group
   */
  getScorecardTagsGroupsId(metadata: types.GetScorecardTagsGroupsIdMetadataParam): Promise<FetchResponse<200, types.GetScorecardTagsGroupsIdResponse200>> {
    return this.core.fetch('/scorecard-tags/groups/{id}', 'get', metadata);
  }

  /**
   * Delete a scorecard tag group
   *
   * @summary Delete a scorecard tag group
   */
  deleteScorecardTagsGroupsId(metadata: types.DeleteScorecardTagsGroupsIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/scorecard-tags/groups/{id}', 'delete', metadata);
  }

  /**
   * Update a scorecard tag
   *
   * @summary Update a scorecard tag
   */
  putScorecardTagsId(body: types.PutScorecardTagsIdBodyParam, metadata: types.PutScorecardTagsIdMetadataParam): Promise<FetchResponse<200, types.PutScorecardTagsIdResponse200>> {
    return this.core.fetch('/scorecard-tags/{id}', 'put', body, metadata);
  }

  /**
   * Delete a scorecard tag
   *
   * @summary Delete a scorecard tag
   */
  deleteScorecardTagsId(metadata: types.DeleteScorecardTagsIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/scorecard-tags/{id}', 'delete', metadata);
  }

  /**
   * Get all companies associated with a scorecard tag
   *
   */
  getScorecardTagsIdCompanies(metadata: types.GetScorecardTagsIdCompaniesMetadataParam): Promise<FetchResponse<200, types.GetScorecardTagsIdCompaniesResponse200>> {
    return this.core.fetch('/scorecard-tags/{id}/companies', 'get', metadata);
  }

  /**
   * Add a scorecard tag to a company
   *
   */
  postScorecardTagsIdCompaniesDomain(metadata: types.PostScorecardTagsIdCompaniesDomainMetadataParam): Promise<FetchResponse<200, types.PostScorecardTagsIdCompaniesDomainResponse200>> {
    return this.core.fetch('/scorecard-tags/{id}/companies/{domain}', 'post', metadata);
  }

  /**
   * Remove a scorecard tag from a company
   *
   */
  deleteScorecardTagsIdCompaniesDomain(metadata: types.DeleteScorecardTagsIdCompaniesDomainMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/scorecard-tags/{id}/companies/{domain}', 'delete', metadata);
  }

  /**
   * Add scorecard tag to a scorecard tag group
   *
   * @summary Add scorecard tag to a scorecard tag group
   */
  postScorecardTagsTag_idGroupsTag_group_id(metadata: types.PostScorecardTagsTagIdGroupsTagGroupIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/scorecard-tags/{tag_id}/groups/{tag_group_id}', 'post', metadata);
  }

  /**
   * Remove scorecard tag from a scorecard tag group
   *
   * @summary Remove scorecard tag from a scorecard tag group
   */
  deleteScorecardTagsTag_idGroupsTag_group_id(metadata: types.DeleteScorecardTagsTagIdGroupsTagGroupIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/scorecard-tags/{tag_id}/groups/{tag_group_id}', 'delete', metadata);
  }

  /**
   * Get all ip domain tags
   *
   */
  getApi(): Promise<FetchResponse<200, types.GetApiResponse200>> {
    return this.core.fetch('/ip-domain-tags', 'get');
  }

  /**
   * Create an ip domain tag
   *
   */
  postApi(body: types.PostApiBodyParam): Promise<FetchResponse<200, types.PostApiResponse200>> {
    return this.core.fetch('/ip-domain-tags', 'post', body);
  }

  /**
   * Get all ip domain tag groups
   *
   */
  getByParentdomainTagGroups(): Promise<FetchResponse<200, types.GetByParentdomainTagGroupsResponse200>> {
    return this.core.fetch('/ip-domain-tags/groups', 'get');
  }

  /**
   * Create a new ip domain tag group
   *
   */
  postApiTagGroups(body: types.PostApiTagGroupsBodyParam): Promise<FetchResponse<200, types.PostApiTagGroupsResponse200>> {
    return this.core.fetch('/ip-domain-tags/groups', 'post', body);
  }

  /**
   * Get an ip domain tag group
   *
   */
  getApiTagGroupsById(metadata: types.GetApiTagGroupsByIdMetadataParam): Promise<FetchResponse<200, types.GetApiTagGroupsByIdResponse200>> {
    return this.core.fetch('/ip-domain-tags/groups/{id}', 'get', metadata);
  }

  /**
   * Edit an ip domain tag group
   *
   */
  putApiTagGroupsById(body: types.PutApiTagGroupsByIdBodyParam, metadata: types.PutApiTagGroupsByIdMetadataParam): Promise<FetchResponse<200, types.PutApiTagGroupsByIdResponse200>> {
    return this.core.fetch('/ip-domain-tags/groups/{id}', 'put', body, metadata);
  }

  /**
   * Delete an ip domain tag group
   *
   */
  deleteApiTagGroupsById(metadata: types.DeleteApiTagGroupsByIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/ip-domain-tags/groups/{id}', 'delete', metadata);
  }

  /**
   * Get all the domain tags of the parent domain
   *
   */
  getApiByParentdomainDomainRelatedTags(metadata: types.GetApiByParentdomainDomainRelatedTagsMetadataParam): Promise<FetchResponse<200, types.GetApiByParentdomainDomainRelatedTagsResponse200>> {
    return this.core.fetch('/ip-domain-tags/parent-domains/{parentDomain}/domains', 'get', metadata);
  }

  /**
   * Get all the ip tags of the parent domain
   *
   */
  getApiByParentdomainIpRelatedTags(metadata: types.GetApiByParentdomainIpRelatedTagsMetadataParam): Promise<FetchResponse<200, types.GetApiByParentdomainIpRelatedTagsResponse200>> {
    return this.core.fetch('/ip-domain-tags/parent-domains/{parentDomain}/ips', 'get', metadata);
  }

  /**
   * Edit an ip domain tag
   *
   */
  putApiByTagid(body: types.PutApiByTagidBodyParam, metadata: types.PutApiByTagidMetadataParam): Promise<FetchResponse<200, types.PutApiByTagidResponse200>> {
    return this.core.fetch('/ip-domain-tags/{tagId}', 'put', body, metadata);
  }

  /**
   * Delete an ip domain tag
   *
   */
  deleteApiByTagid(metadata: types.DeleteApiByTagidMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/ip-domain-tags/{tagId}', 'delete', metadata);
  }

  /**
   * Add ip domain tag to a ip domain tag group
   *
   */
  postApiGroupsByTaggroupidAssociationByTagid(body: types.PostApiGroupsByTaggroupidAssociationByTagidBodyParam, metadata: types.PostApiGroupsByTaggroupidAssociationByTagidMetadataParam): Promise<FetchResponse<200, types.PostApiGroupsByTaggroupidAssociationByTagidResponse200>> {
    return this.core.fetch('/ip-domain-tags/{tagId}/groups/{tagGroupId}', 'post', body, metadata);
  }

  /**
   * Remove ip domain tag to a ip domain tag group
   *
   */
  deleteApiGroupsByTaggroupidAssociationByTagid(body: types.DeleteApiGroupsByTaggroupidAssociationByTagidBodyParam, metadata: types.DeleteApiGroupsByTaggroupidAssociationByTagidMetadataParam): Promise<FetchResponse<200, types.DeleteApiGroupsByTaggroupidAssociationByTagidResponse200>> {
    return this.core.fetch('/ip-domain-tags/{tagId}/groups/{tagGroupId}', 'delete', body, metadata);
  }

  /**
   * Add a tag to a domain
   *
   */
  postApiByParentdomainDomainByDomainAssociateTagsByTagid(body: types.PostApiByParentdomainDomainByDomainAssociateTagsByTagidBodyParam, metadata: types.PostApiByParentdomainDomainByDomainAssociateTagsByTagidMetadataParam): Promise<FetchResponse<200, types.PostApiByParentdomainDomainByDomainAssociateTagsByTagidResponse200>> {
    return this.core.fetch('/ip-domain-tags/{tagId}/parent-domains/{parentDomain}/domain/{domain}', 'post', body, metadata);
  }

  /**
   * Remove a tag from a domain
   *
   */
  deleteApiByParentdomainDomainByDomainAssociateTagsByTagid(body: types.DeleteApiByParentdomainDomainByDomainAssociateTagsByTagidBodyParam, metadata: types.DeleteApiByParentdomainDomainByDomainAssociateTagsByTagidMetadataParam): Promise<FetchResponse<200, types.DeleteApiByParentdomainDomainByDomainAssociateTagsByTagidResponse200>> {
    return this.core.fetch('/ip-domain-tags/{tagId}/parent-domains/{parentDomain}/domain/{domain}', 'delete', body, metadata);
  }

  /**
   * Add a tag to an ip
   *
   */
  postApiByParentdomainIpByIpAssociateTagsByTagid(body: types.PostApiByParentdomainIpByIpAssociateTagsByTagidBodyParam, metadata: types.PostApiByParentdomainIpByIpAssociateTagsByTagidMetadataParam): Promise<FetchResponse<200, types.PostApiByParentdomainIpByIpAssociateTagsByTagidResponse200>> {
    return this.core.fetch('/ip-domain-tags/{tagId}/parent-domains/{parentDomain}/ip/{ip}', 'post', body, metadata);
  }

  /**
   * Remove a tag from an ip
   *
   */
  deleteApiByParentdomainIpByIpAssociateTagsByTagid(body: types.DeleteApiByParentdomainIpByIpAssociateTagsByTagidBodyParam, metadata: types.DeleteApiByParentdomainIpByIpAssociateTagsByTagidMetadataParam): Promise<FetchResponse<200, types.DeleteApiByParentdomainIpByIpAssociateTagsByTagidResponse200>> {
    return this.core.fetch('/ip-domain-tags/{tagId}/parent-domains/{parentDomain}/ip/{ip}', 'delete', body, metadata);
  }

  /**
   * Get all the domains for the parent domain
   *
   */
  postByParentdomainAssetsDomains(body: types.PostByParentdomainAssetsDomainsBodyParam, metadata: types.PostByParentdomainAssetsDomainsMetadataParam): Promise<FetchResponse<200, types.PostByParentdomainAssetsDomainsResponse200>> {
    return this.core.fetch('/parent-domains/{parentDomain}/domains', 'post', body, metadata);
  }

  /**
   * Get all the ips for the parent domain
   *
   */
  postByParentdomainAssetsIps(body: types.PostByParentdomainAssetsIpsBodyParam, metadata: types.PostByParentdomainAssetsIpsMetadataParam): Promise<FetchResponse<200, types.PostByParentdomainAssetsIpsResponse200>> {
    return this.core.fetch('/parent-domains/{parentDomain}/ips', 'post', body, metadata);
  }

  /**
   * Search companies in bulk
   *
   * @summary Search companies in bulk
   */
  postCompaniesBulkSearches(body: types.PostCompaniesBulkSearchesBodyParam): Promise<FetchResponse<201, types.PostCompaniesBulkSearchesResponse201>> {
    return this.core.fetch('/companies/bulk-searches', 'post', body);
  }

  /**
   * Get a company information and scorecard summary
   *
   * @throws FetchError<400, types.GetCompaniesScorecardIdentifierResponse400> Bad Request: The scorecard_identifier or the authorization header is malformed.
   * @throws FetchError<401, types.GetCompaniesScorecardIdentifierResponse401> Unauthorized
   * @throws FetchError<403, types.GetCompaniesScorecardIdentifierResponse403> To access scorecard's factor level data, company must be added to a portfolio first.
   * @throws FetchError<404, types.GetCompaniesScorecardIdentifierResponse404> Company doesn't have a scorecard yet, you can add it to any portfolio to get it
   * created.
   * @throws FetchError<429, types.GetCompaniesScorecardIdentifierResponse429> Too Many Requests
   */
  getCompaniesScorecard_identifier(metadata: types.GetCompaniesScorecardIdentifierMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}', 'get', metadata);
  }

  /**
   * Get a company's expanded risk 
   *
   *  **Note: Requires access to ESG**
   *
   * @summary Get a company's expanded risk
   */
  getCompaniesScorecard_identifierExpandedRisk(metadata: types.GetCompaniesScorecardIdentifierExpandedRiskMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierExpandedRiskResponse200> | FetchResponse<number, types.GetCompaniesScorecardIdentifierExpandedRiskResponseDefault>> {
    return this.core.fetch('/companies/{scorecard_identifier}/expanded-risk', 'get', metadata);
  }

  /**
   * Get a company factor scores and issue counts
   *
   * @throws FetchError<400, types.GetCompaniesScorecardIdentifierFactorsResponse400> Bad Request: The scorecard_identifier or the authorization header is malformed.
   * @throws FetchError<401, types.GetCompaniesScorecardIdentifierFactorsResponse401> Unauthorized
   * @throws FetchError<403, types.GetCompaniesScorecardIdentifierFactorsResponse403> To access scorecard's factor level data, company must be added to a portfolio first.
   * @throws FetchError<404, types.GetCompaniesScorecardIdentifierFactorsResponse404> Company doesn't have a scorecard yet, you can add it to any portfolio to get it
   * created.
   * @throws FetchError<429, types.GetCompaniesScorecardIdentifierFactorsResponse429> Too Many Requests
   */
  getCompaniesScorecard_identifierFactors(metadata: types.GetCompaniesScorecardIdentifierFactorsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierFactorsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/factors', 'get', metadata);
  }

  /**
   * Note: each entry in the response will have scores for each factor, you can obtain the
   * factors currently available from [factor
   * metadata](#tag/metadata%2Fpaths%2F~1metadata~1factors%2Fget)
   *
   * @summary Get a company's historical factor scores
   */
  getCompaniesScorecard_identifierHistoryFactorsScore(metadata: types.GetCompaniesScorecardIdentifierHistoryFactorsScoreMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryFactorsScoreResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/factors/score', 'get', metadata);
  }

  /**
   * Get a company's historical scores
   *
   */
  getCompaniesScorecard_identifierHistoryScore(metadata: types.GetCompaniesScorecardIdentifierHistoryScoreMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryScoreResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/score', 'get', metadata);
  }

  /**
   * Get the score plan by score target
   *
   */
  getCompaniesDomainScorePlansByTargetScore(metadata: types.GetCompaniesDomainScorePlansByTargetScoreMetadataParam): Promise<FetchResponse<200, types.GetCompaniesDomainScorePlansByTargetScoreResponse200>> {
    return this.core.fetch('/companies/{domain}/score-plans/by-target/{score}', 'get', metadata);
  }

  /**
   * Get factor scores for the industry
   *
   * @summary Get factor scores for the industry
   */
  getIndustriesIndustryFactors(metadata: types.GetIndustriesIndustryFactorsMetadataParam): Promise<FetchResponse<200, types.GetIndustriesIndustryFactorsResponse200>> {
    return this.core.fetch('/industries/{industry}/factors', 'get', metadata);
  }

  /**
   * Get historical factor scores for the industry
   *
   * @summary Get historical factor scores for the industry
   */
  getIndustriesIndustryHistoryFactors(metadata: types.GetIndustriesIndustryHistoryFactorsMetadataParam): Promise<FetchResponse<200, types.GetIndustriesIndustryHistoryFactorsResponse200>> {
    return this.core.fetch('/industries/{industry}/history/factors', 'get', metadata);
  }

  /**
   * Get score for the industry
   *
   * @summary Get score for the industry
   */
  getIndustriesIndustryScore(metadata: types.GetIndustriesIndustryScoreMetadataParam): Promise<FetchResponse<200, types.GetIndustriesIndustryScoreResponse200>> {
    return this.core.fetch('/industries/{industry}/score', 'get', metadata);
  }

  /**
   * Get a company's historical events
   *
   */
  getCompaniesScorecard_identifierHistoryEvents(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/', 'get', metadata);
  }

  /**
   * Get a company's historical breaches events
   *
   */
  getCompaniesDomainHistoryEventsBreaches(metadata: types.GetCompaniesDomainHistoryEventsBreachesMetadataParam): Promise<FetchResponse<200, types.GetCompaniesDomainHistoryEventsBreachesResponse200>> {
    return this.core.fetch('/companies/{domain}/history/events/breaches', 'get', metadata);
  }

  /**
   * Get the score context for an issue type
   *
   */
  getCompaniesDomainIssueContextIssue_type(metadata: types.GetCompaniesDomainIssueContextIssueTypeMetadataParam): Promise<FetchResponse<200, types.GetCompaniesDomainIssueContextIssueTypeResponse200>> {
    return this.core.fetch('/companies/{domain}/issue-context/{issue_type}', 'get', metadata);
  }

  /**
   * Get "active_cve_exploitation_attempted" issues in a scorecard
   *
   * @summary Get "active_cve_exploitation_attempted" issues in 
   */
  getCompaniesScorecard_identifierIssuesActive_cve_exploitation_attempted(metadata: types.GetCompaniesScorecardIdentifierIssuesActiveCveExploitationAttemptedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesActiveCveExploitationAttemptedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/active_cve_exploitation_attempted', 'get', metadata);
  }

  /**
   * Get "admin_subdomain_v2" issues in a scorecard
   *
   * @summary Get "admin_subdomain_v2" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesAdmin_subdomain_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesAdminSubdomainV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesAdminSubdomainV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/admin_subdomain_v2', 'get', metadata);
  }

  /**
   * Get "adware_installation" issues in a scorecard
   *
   * @summary Get "adware_installation" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesAdware_installation(metadata: types.GetCompaniesScorecardIdentifierIssuesAdwareInstallationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesAdwareInstallationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/adware_installation', 'get', metadata);
  }

  /**
   * Get "adware_installation_trail" issues in a scorecard
   *
   * @summary Get "adware_installation_trail" issues in a scorec
   */
  getCompaniesScorecard_identifierIssuesAdware_installation_trail(metadata: types.GetCompaniesScorecardIdentifierIssuesAdwareInstallationTrailMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesAdwareInstallationTrailResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/adware_installation_trail', 'get', metadata);
  }

  /**
   * Get "age_exposed" issues in a scorecard
   *
   * @summary Get "age_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesAge_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesAgeExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesAgeExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/age_exposed', 'get', metadata);
  }

  /**
   * Get "alleged_breach_incident" issues in a scorecard
   *
   * @summary Get "alleged_breach_incident" issues in a scorecar
   */
  getCompaniesScorecard_identifierIssuesAlleged_breach_incident(metadata: types.GetCompaniesScorecardIdentifierIssuesAllegedBreachIncidentMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesAllegedBreachIncidentResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/alleged_breach_incident', 'get', metadata);
  }

  /**
   * Get "anonymous_proxy" issues in a scorecard
   *
   * @summary Get "anonymous_proxy" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesAnonymous_proxy(metadata: types.GetCompaniesScorecardIdentifierIssuesAnonymousProxyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesAnonymousProxyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/anonymous_proxy', 'get', metadata);
  }

  /**
   * Get "api_key_exposed" issues in a scorecard
   *
   * @summary Get "api_key_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesApi_key_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesApiKeyExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesApiKeyExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/api_key_exposed', 'get', metadata);
  }

  /**
   * Get "attack_detected" issues in a scorecard
   *
   * @summary Get "attack_detected" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesAttack_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesAttackDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesAttackDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/attack_detected', 'get', metadata);
  }

  /**
   * Get "attempted_information_leak" issues in a scorecard
   *
   * @summary Get "attempted_information_leak" issues in a score
   */
  getCompaniesScorecard_identifierIssuesAttempted_information_leak(metadata: types.GetCompaniesScorecardIdentifierIssuesAttemptedInformationLeakMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesAttemptedInformationLeakResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/attempted_information_leak', 'get', metadata);
  }

  /**
   * Get "birthday_exposed" issues in a scorecard
   *
   * @summary Get "birthday_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesBirthday_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesBirthdayExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesBirthdayExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/birthday_exposed', 'get', metadata);
  }

  /**
   * Get "bitcoin_server" issues in a scorecard
   *
   * @summary Get "bitcoin_server" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesBitcoin_server(metadata: types.GetCompaniesScorecardIdentifierIssuesBitcoinServerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesBitcoinServerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/bitcoin_server', 'get', metadata);
  }

  /**
   * Get "browser_logs_contain_debug_message" issues in a scorecard
   *
   * @summary Get "browser_logs_contain_debug_message" issues in
   */
  getCompaniesScorecard_identifierIssuesBrowser_logs_contain_debug_message(metadata: types.GetCompaniesScorecardIdentifierIssuesBrowserLogsContainDebugMessageMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesBrowserLogsContainDebugMessageResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/browser_logs_contain_debug_message', 'get', metadata);
  }

  /**
   * Get "cdn_hosting" issues in a scorecard
   *
   * @summary Get "cdn_hosting" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesCdn_hosting(metadata: types.GetCompaniesScorecardIdentifierIssuesCdnHostingMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCdnHostingResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/cdn_hosting', 'get', metadata);
  }

  /**
   * Get "cleartext_password_exposed" issues in a scorecard
   *
   * @summary Get "cleartext_password_exposed" issues in a score
   */
  getCompaniesScorecard_identifierIssuesCleartext_password_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesCleartextPasswordExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCleartextPasswordExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/cleartext_password_exposed', 'get', metadata);
  }

  /**
   * Get "cobalt_strike_c2_detected" issues in a scorecard
   *
   * @summary Get "cobalt_strike_c2_detected" issues in a scorec
   */
  getCompaniesScorecard_identifierIssuesCobalt_strike_c2_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesCobaltStrikeC2DetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCobaltStrikeC2DetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/cobalt_strike_c2_detected', 'get', metadata);
  }

  /**
   * Get "cobalt_strike_c2_service" issues in a scorecard
   *
   * @summary Get "cobalt_strike_c2_service" issues in a scoreca
   */
  getCompaniesScorecard_identifierIssuesCobalt_strike_c2_service(metadata: types.GetCompaniesScorecardIdentifierIssuesCobaltStrikeC2ServiceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCobaltStrikeC2ServiceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/cobalt_strike_c2_service', 'get', metadata);
  }

  /**
   * Get "communication_server_with_expired_cert" issues in a scorecard
   *
   * @summary Get "communication_server_with_expired_cert" issue
   */
  getCompaniesScorecard_identifierIssuesCommunication_server_with_expired_cert(metadata: types.GetCompaniesScorecardIdentifierIssuesCommunicationServerWithExpiredCertMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCommunicationServerWithExpiredCertResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/communication_server_with_expired_cert', 'get', metadata);
  }

  /**
   * Get "communication_with_server_certificate_issued_by_blacklisted_country" issues in a
   * scorecard
   *
   * @summary Get "communication_with_server_certificate_issued_
   */
  getCompaniesScorecard_identifierIssuesCommunication_with_server_certificate_issued_by_blacklisted_country(metadata: types.GetCompaniesScorecardIdentifierIssuesCommunicationWithServerCertificateIssuedByBlacklistedCountryMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCommunicationWithServerCertificateIssuedByBlacklistedCountryResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/communication_with_server_certificate_issued_by_blacklisted_country', 'get', metadata);
  }

  /**
   * Get "compromised_by_information_stealer" issues in a scorecard
   *
   * @summary Get "compromised_by_information_stealer" issues in
   */
  getCompaniesScorecard_identifierIssuesCompromised_by_information_stealer(metadata: types.GetCompaniesScorecardIdentifierIssuesCompromisedByInformationStealerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCompromisedByInformationStealerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/compromised_by_information_stealer', 'get', metadata);
  }

  /**
   * Get "compromised_credentials_found" issues in a scorecard
   *
   * @summary Get "compromised_credentials_found" issues in a sc
   */
  getCompaniesScorecard_identifierIssuesCompromised_credentials_found(metadata: types.GetCompaniesScorecardIdentifierIssuesCompromisedCredentialsFoundMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCompromisedCredentialsFoundResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/compromised_credentials_found', 'get', metadata);
  }

  /**
   * Get "contact_information_detected" issues in a scorecard
   *
   * @summary Get "contact_information_detected" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesContact_information_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesContactInformationDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesContactInformationDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/contact_information_detected', 'get', metadata);
  }

  /**
   * Get "cookie_missing_http_only" issues in a scorecard
   *
   * @summary Get "cookie_missing_http_only" issues in a scoreca
   */
  getCompaniesScorecard_identifierIssuesCookie_missing_http_only(metadata: types.GetCompaniesScorecardIdentifierIssuesCookieMissingHttpOnlyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCookieMissingHttpOnlyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/cookie_missing_http_only', 'get', metadata);
  }

  /**
   * Get "cookie_missing_secure_attribute" issues in a scorecard
   *
   * @summary Get "cookie_missing_secure_attribute" issues in a 
   */
  getCompaniesScorecard_identifierIssuesCookie_missing_secure_attribute(metadata: types.GetCompaniesScorecardIdentifierIssuesCookieMissingSecureAttributeMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCookieMissingSecureAttributeResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/cookie_missing_secure_attribute', 'get', metadata);
  }

  /**
   * Get "csp_no_policy_v2" issues in a scorecard
   *
   * @summary Get "csp_no_policy_v2" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesCsp_no_policy_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesCspNoPolicyV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCspNoPolicyV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/csp_no_policy_v2', 'get', metadata);
  }

  /**
   * Get "csp_too_broad_v2" issues in a scorecard
   *
   * @summary Get "csp_too_broad_v2" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesCsp_too_broad_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesCspTooBroadV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCspTooBroadV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/csp_too_broad_v2', 'get', metadata);
  }

  /**
   * Get "csp_unsafe_policy_v2" issues in a scorecard
   *
   * @summary Get "csp_unsafe_policy_v2" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesCsp_unsafe_policy_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesCspUnsafePolicyV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCspUnsafePolicyV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/csp_unsafe_policy_v2', 'get', metadata);
  }

  /**
   * Get "cve_in_use_by_threat_actor" issues in a scorecard
   *
   * @summary Get "cve_in_use_by_threat_actor" issues in a score
   */
  getCompaniesScorecard_identifierIssuesCve_in_use_by_threat_actor(metadata: types.GetCompaniesScorecardIdentifierIssuesCveInUseByThreatActorMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesCveInUseByThreatActorResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/cve_in_use_by_threat_actor', 'get', metadata);
  }

  /**
   * Get "domain_missing_https_v2" issues in a scorecard
   *
   * @summary Get "domain_missing_https_v2" issues in a scorecar
   */
  getCompaniesScorecard_identifierIssuesDomain_missing_https_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesDomainMissingHttpsV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesDomainMissingHttpsV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/domain_missing_https_v2', 'get', metadata);
  }

  /**
   * Get "dos_attack_attempt_detected" issues in a scorecard
   *
   * @summary Get "dos_attack_attempt_detected" issues in a scor
   */
  getCompaniesScorecard_identifierIssuesDos_attack_attempt_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesDosAttackAttemptDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesDosAttackAttemptDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/dos_attack_attempt_detected', 'get', metadata);
  }

  /**
   * Get "email_exposed" issues in a scorecard
   *
   * @summary Get "email_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesEmail_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesEmailExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesEmailExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/email_exposed', 'get', metadata);
  }

  /**
   * Get "employer_exposed" issues in a scorecard
   *
   * @summary Get "employer_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesEmployer_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesEmployerExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesEmployerExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/employer_exposed', 'get', metadata);
  }

  /**
   * Get "exploit_attempt_detected" issues in a scorecard
   *
   * @summary Get "exploit_attempt_detected" issues in a scoreca
   */
  getCompaniesScorecard_identifierIssuesExploit_attempt_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesExploitAttemptDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesExploitAttemptDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/exploit_attempt_detected', 'get', metadata);
  }

  /**
   * Get "exploited_product" issues in a scorecard
   *
   * @summary Get "exploited_product" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesExploited_product(metadata: types.GetCompaniesScorecardIdentifierIssuesExploitedProductMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesExploitedProductResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/exploited_product', 'get', metadata);
  }

  /**
   * Get "exposed_cisco_web_ui" issues in a scorecard
   *
   * @summary Get "exposed_cisco_web_ui" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesExposed_cisco_web_ui(metadata: types.GetCompaniesScorecardIdentifierIssuesExposedCiscoWebUiMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesExposedCiscoWebUiResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/exposed_cisco_web_ui', 'get', metadata);
  }

  /**
   * Get "exposed_embedded_iot_web_server" issues in a scorecard
   *
   * @summary Get "exposed_embedded_iot_web_server" issues in a 
   */
  getCompaniesScorecard_identifierIssuesExposed_embedded_iot_web_server(metadata: types.GetCompaniesScorecardIdentifierIssuesExposedEmbeddedIotWebServerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesExposedEmbeddedIotWebServerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/exposed_embedded_iot_web_server', 'get', metadata);
  }

  /**
   * Get "exposed_iscsi_device" issues in a scorecard
   *
   * @summary Get "exposed_iscsi_device" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesExposed_iscsi_device(metadata: types.GetCompaniesScorecardIdentifierIssuesExposedIscsiDeviceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesExposedIscsiDeviceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/exposed_iscsi_device', 'get', metadata);
  }

  /**
   * Get "exposed_mac_airport_device" issues in a scorecard
   *
   * @summary Get "exposed_mac_airport_device" issues in a score
   */
  getCompaniesScorecard_identifierIssuesExposed_mac_airport_device(metadata: types.GetCompaniesScorecardIdentifierIssuesExposedMacAirportDeviceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesExposedMacAirportDeviceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/exposed_mac_airport_device', 'get', metadata);
  }

  /**
   * Get "exposed_mobile_printing_service" issues in a scorecard
   *
   * @summary Get "exposed_mobile_printing_service" issues in a 
   */
  getCompaniesScorecard_identifierIssuesExposed_mobile_printing_service(metadata: types.GetCompaniesScorecardIdentifierIssuesExposedMobilePrintingServiceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesExposedMobilePrintingServiceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/exposed_mobile_printing_service', 'get', metadata);
  }

  /**
   * Get "exposed_network_attached_storage_device" issues in a scorecard
   *
   * @summary Get "exposed_network_attached_storage_device" issu
   */
  getCompaniesScorecard_identifierIssuesExposed_network_attached_storage_device(metadata: types.GetCompaniesScorecardIdentifierIssuesExposedNetworkAttachedStorageDeviceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesExposedNetworkAttachedStorageDeviceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/exposed_network_attached_storage_device', 'get', metadata);
  }

  /**
   * Get "exposed_personal_information" issues in a scorecard
   *
   * @summary Get "exposed_personal_information" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesExposed_personal_information(metadata: types.GetCompaniesScorecardIdentifierIssuesExposedPersonalInformationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesExposedPersonalInformationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/exposed_personal_information', 'get', metadata);
  }

  /**
   * Get "exposed_personal_information_info" issues in a scorecard
   *
   * @summary Get "exposed_personal_information_info" issues in 
   */
  getCompaniesScorecard_identifierIssuesExposed_personal_information_info(metadata: types.GetCompaniesScorecardIdentifierIssuesExposedPersonalInformationInfoMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesExposedPersonalInformationInfoResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/exposed_personal_information_info', 'get', metadata);
  }

  /**
   * Get "exposed_printer" issues in a scorecard
   *
   * @summary Get "exposed_printer" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesExposed_printer(metadata: types.GetCompaniesScorecardIdentifierIssuesExposedPrinterMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesExposedPrinterResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/exposed_printer', 'get', metadata);
  }

  /**
   * Get "fail_to_load_page_components" issues in a scorecard
   *
   * @summary Get "fail_to_load_page_components" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesFail_to_load_page_components(metadata: types.GetCompaniesScorecardIdentifierIssuesFailToLoadPageComponentsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesFailToLoadPageComponentsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/fail_to_load_page_components', 'get', metadata);
  }

  /**
   * Get "general_scan_detected" issues in a scorecard
   *
   * @summary Get "general_scan_detected" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesGeneral_scan_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesGeneralScanDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesGeneralScanDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/general_scan_detected', 'get', metadata);
  }

  /**
   * Get "hashed_password_exposed" issues in a scorecard
   *
   * @summary Get "hashed_password_exposed" issues in a scorecar
   */
  getCompaniesScorecard_identifierIssuesHashed_password_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesHashedPasswordExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesHashedPasswordExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/hashed_password_exposed', 'get', metadata);
  }

  /**
   * Get "historical_compromised_credentials_found" issues in a scorecard
   *
   * @summary Get "historical_compromised_credentials_found" iss
   */
  getCompaniesScorecard_identifierIssuesHistorical_compromised_credentials_found(metadata: types.GetCompaniesScorecardIdentifierIssuesHistoricalCompromisedCredentialsFoundMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesHistoricalCompromisedCredentialsFoundResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/historical_compromised_credentials_found', 'get', metadata);
  }

  /**
   * Get "hosted_on_object_storage_v2" issues in a scorecard
   *
   * @summary Get "hosted_on_object_storage_v2" issues in a scor
   */
  getCompaniesScorecard_identifierIssuesHosted_on_object_storage_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesHostedOnObjectStorageV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesHostedOnObjectStorageV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/hosted_on_object_storage_v2', 'get', metadata);
  }

  /**
   * Get "hsts_incorrect_v2" issues in a scorecard
   *
   * @summary Get "hsts_incorrect_v2" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesHsts_incorrect_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesHstsIncorrectV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesHstsIncorrectV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/hsts_incorrect_v2', 'get', metadata);
  }

  /**
   * Get "industrial_control_device" issues in a scorecard
   *
   * @summary Get "industrial_control_device" issues in a scorec
   */
  getCompaniesScorecard_identifierIssuesIndustrial_control_device(metadata: types.GetCompaniesScorecardIdentifierIssuesIndustrialControlDeviceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIndustrialControlDeviceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/industrial_control_device', 'get', metadata);
  }

  /**
   * Get "insecure_ftp" issues in a scorecard
   *
   * @summary Get "insecure_ftp" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesInsecure_ftp(metadata: types.GetCompaniesScorecardIdentifierIssuesInsecureFtpMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesInsecureFtpResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/insecure_ftp', 'get', metadata);
  }

  /**
   * Get "insecure_https_redirect_pattern_v2" issues in a scorecard
   *
   * @summary Get "insecure_https_redirect_pattern_v2" issues in
   */
  getCompaniesScorecard_identifierIssuesInsecure_https_redirect_pattern_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesInsecureHttpsRedirectPatternV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesInsecureHttpsRedirectPatternV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/insecure_https_redirect_pattern_v2', 'get', metadata);
  }

  /**
   * Get "insecure_server_certificate_key_size" issues in a scorecard
   *
   * @summary Get "insecure_server_certificate_key_size" issues 
   */
  getCompaniesScorecard_identifierIssuesInsecure_server_certificate_key_size(metadata: types.GetCompaniesScorecardIdentifierIssuesInsecureServerCertificateKeySizeMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesInsecureServerCertificateKeySizeResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/insecure_server_certificate_key_size', 'get', metadata);
  }

  /**
   * Get "insecure_telnet" issues in a scorecard
   *
   * @summary Get "insecure_telnet" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesInsecure_telnet(metadata: types.GetCompaniesScorecardIdentifierIssuesInsecureTelnetMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesInsecureTelnetResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/insecure_telnet', 'get', metadata);
  }

  /**
   * Get "instant_messaging_account_exposed" issues in a scorecard
   *
   * @summary Get "instant_messaging_account_exposed" issues in 
   */
  getCompaniesScorecard_identifierIssuesInstant_messaging_account_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesInstantMessagingAccountExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesInstantMessagingAccountExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/instant_messaging_account_exposed', 'get', metadata);
  }

  /**
   * Get "iot_camera" issues in a scorecard
   *
   * @summary Get "iot_camera" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesIot_camera(metadata: types.GetCompaniesScorecardIdentifierIssuesIotCameraMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIotCameraResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iot_camera', 'get', metadata);
  }

  /**
   * Get "ip_address_exposed" issues in a scorecard
   *
   * @summary Get "ip_address_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesIp_address_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesIpAddressExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIpAddressExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/ip_address_exposed', 'get', metadata);
  }

  /**
   * Get "ip_black_list_due_malicious_activity" issues in a scorecard
   *
   * @summary Get "ip_black_list_due_malicious_activity" issues 
   */
  getCompaniesScorecard_identifierIssuesIp_black_list_due_malicious_activity(metadata: types.GetCompaniesScorecardIdentifierIssuesIpBlackListDueMaliciousActivityMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIpBlackListDueMaliciousActivityResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/ip_black_list_due_malicious_activity', 'get', metadata);
  }

  /**
   * Get "iss_account_lockout_threshold_enabled" issues in a scorecard
   *
   * @summary Get "iss_account_lockout_threshold_enabled" issues
   */
  getCompaniesScorecard_identifierIssuesIss_account_lockout_threshold_enabled(metadata: types.GetCompaniesScorecardIdentifierIssuesIssAccountLockoutThresholdEnabledMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssAccountLockoutThresholdEnabledResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_account_lockout_threshold_enabled', 'get', metadata);
  }

  /**
   * Get "iss_admin_service_down" issues in a scorecard
   *
   * @summary Get "iss_admin_service_down" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesIss_admin_service_down(metadata: types.GetCompaniesScorecardIdentifierIssuesIssAdminServiceDownMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssAdminServiceDownResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_admin_service_down', 'get', metadata);
  }

  /**
   * Get "iss_all_device_sensor_policy_applied" issues in a scorecard
   *
   * @summary Get "iss_all_device_sensor_policy_applied" issues 
   */
  getCompaniesScorecard_identifierIssuesIss_all_device_sensor_policy_applied(metadata: types.GetCompaniesScorecardIdentifierIssuesIssAllDeviceSensorPolicyAppliedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssAllDeviceSensorPolicyAppliedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_all_device_sensor_policy_applied', 'get', metadata);
  }

  /**
   * Get "iss_completed_vulnerability_management_scans" issues in a scorecard
   *
   * @summary Get "iss_completed_vulnerability_management_scans"
   */
  getCompaniesScorecard_identifierIssuesIss_completed_vulnerability_management_scans(metadata: types.GetCompaniesScorecardIdentifierIssuesIssCompletedVulnerabilityManagementScansMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssCompletedVulnerabilityManagementScansResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_completed_vulnerability_management_scans', 'get', metadata);
  }

  /**
   * Get "iss_database_instances_not_encrypted" issues in a scorecard
   *
   * @summary Get "iss_database_instances_not_encrypted" issues 
   */
  getCompaniesScorecard_identifierIssuesIss_database_instances_not_encrypted(metadata: types.GetCompaniesScorecardIdentifierIssuesIssDatabaseInstancesNotEncryptedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssDatabaseInstancesNotEncryptedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_database_instances_not_encrypted', 'get', metadata);
  }

  /**
   * Get "iss_detected_cve_linux_instance" issues in a scorecard
   *
   * @summary Get "iss_detected_cve_linux_instance" issues in a 
   */
  getCompaniesScorecard_identifierIssuesIss_detected_cve_linux_instance(metadata: types.GetCompaniesScorecardIdentifierIssuesIssDetectedCveLinuxInstanceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssDetectedCveLinuxInstanceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_detected_cve_linux_instance', 'get', metadata);
  }

  /**
   * Get "iss_detected_cve_windows_instance" issues in a scorecard
   *
   * @summary Get "iss_detected_cve_windows_instance" issues in 
   */
  getCompaniesScorecard_identifierIssuesIss_detected_cve_windows_instance(metadata: types.GetCompaniesScorecardIdentifierIssuesIssDetectedCveWindowsInstanceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssDetectedCveWindowsInstanceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_detected_cve_windows_instance', 'get', metadata);
  }

  /**
   * Get "iss_detected_os_in_cloud_vm" issues in a scorecard
   *
   * @summary Get "iss_detected_os_in_cloud_vm" issues in a scor
   */
  getCompaniesScorecard_identifierIssuesIss_detected_os_in_cloud_vm(metadata: types.GetCompaniesScorecardIdentifierIssuesIssDetectedOsInCloudVmMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssDetectedOsInCloudVmResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_detected_os_in_cloud_vm', 'get', metadata);
  }

  /**
   * Get "iss_detected_software_in_cloud_vm" issues in a scorecard
   *
   * @summary Get "iss_detected_software_in_cloud_vm" issues in 
   */
  getCompaniesScorecard_identifierIssuesIss_detected_software_in_cloud_vm(metadata: types.GetCompaniesScorecardIdentifierIssuesIssDetectedSoftwareInCloudVmMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssDetectedSoftwareInCloudVmResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_detected_software_in_cloud_vm', 'get', metadata);
  }

  /**
   * Get "iss_device_control_policy_not_applied" issues in a scorecard
   *
   * @summary Get "iss_device_control_policy_not_applied" issues
   */
  getCompaniesScorecard_identifierIssuesIss_device_control_policy_not_applied(metadata: types.GetCompaniesScorecardIdentifierIssuesIssDeviceControlPolicyNotAppliedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssDeviceControlPolicyNotAppliedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_device_control_policy_not_applied', 'get', metadata);
  }

  /**
   * Get "iss_device_firewall_policy_not_applied" issues in a scorecard
   *
   * @summary Get "iss_device_firewall_policy_not_applied" issue
   */
  getCompaniesScorecard_identifierIssuesIss_device_firewall_policy_not_applied(metadata: types.GetCompaniesScorecardIdentifierIssuesIssDeviceFirewallPolicyNotAppliedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssDeviceFirewallPolicyNotAppliedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_device_firewall_policy_not_applied', 'get', metadata);
  }

  /**
   * Get "iss_device_prevention_policy_not_applied" issues in a scorecard
   *
   * @summary Get "iss_device_prevention_policy_not_applied" iss
   */
  getCompaniesScorecard_identifierIssuesIss_device_prevention_policy_not_applied(metadata: types.GetCompaniesScorecardIdentifierIssuesIssDevicePreventionPolicyNotAppliedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssDevicePreventionPolicyNotAppliedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_device_prevention_policy_not_applied', 'get', metadata);
  }

  /**
   * Get "iss_device_remote_response_policy_not_applied" issues in a scorecard
   *
   * @summary Get "iss_device_remote_response_policy_not_applied
   */
  getCompaniesScorecard_identifierIssuesIss_device_remote_response_policy_not_applied(metadata: types.GetCompaniesScorecardIdentifierIssuesIssDeviceRemoteResponsePolicyNotAppliedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssDeviceRemoteResponsePolicyNotAppliedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_device_remote_response_policy_not_applied', 'get', metadata);
  }

  /**
   * Get "iss_device_sensor_update_policy_not_applied" issues in a scorecard
   *
   * @summary Get "iss_device_sensor_update_policy_not_applied" 
   */
  getCompaniesScorecard_identifierIssuesIss_device_sensor_update_policy_not_applied(metadata: types.GetCompaniesScorecardIdentifierIssuesIssDeviceSensorUpdatePolicyNotAppliedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssDeviceSensorUpdatePolicyNotAppliedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_device_sensor_update_policy_not_applied', 'get', metadata);
  }

  /**
   * Get "iss_digital_footprint_hostname" issues in a scorecard
   *
   * @summary Get "iss_digital_footprint_hostname" issues in a s
   */
  getCompaniesScorecard_identifierIssuesIss_digital_footprint_hostname(metadata: types.GetCompaniesScorecardIdentifierIssuesIssDigitalFootprintHostnameMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssDigitalFootprintHostnameResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_digital_footprint_hostname', 'get', metadata);
  }

  /**
   * Get "iss_digital_footprint_ip" issues in a scorecard
   *
   * @summary Get "iss_digital_footprint_ip" issues in a scoreca
   */
  getCompaniesScorecard_identifierIssuesIss_digital_footprint_ip(metadata: types.GetCompaniesScorecardIdentifierIssuesIssDigitalFootprintIpMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssDigitalFootprintIpResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_digital_footprint_ip', 'get', metadata);
  }

  /**
   * Get "iss_endpoint_security_product_detected" issues in a scorecard
   *
   * @summary Get "iss_endpoint_security_product_detected" issue
   */
  getCompaniesScorecard_identifierIssuesIss_endpoint_security_product_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesIssEndpointSecurityProductDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssEndpointSecurityProductDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_endpoint_security_product_detected', 'get', metadata);
  }

  /**
   * Get "iss_ephemeral_disks_not_encrypted" issues in a scorecard
   *
   * @summary Get "iss_ephemeral_disks_not_encrypted" issues in 
   */
  getCompaniesScorecard_identifierIssuesIss_ephemeral_disks_not_encrypted(metadata: types.GetCompaniesScorecardIdentifierIssuesIssEphemeralDisksNotEncryptedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssEphemeralDisksNotEncryptedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_ephemeral_disks_not_encrypted', 'get', metadata);
  }

  /**
   * Get "iss_factors_settings_good_ztc_audit_scores" issues in a scorecard
   *
   * @summary Get "iss_factors_settings_good_ztc_audit_scores" i
   */
  getCompaniesScorecard_identifierIssuesIss_factors_settings_good_ztc_audit_scores(metadata: types.GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsGoodZtcAuditScoresMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsGoodZtcAuditScoresResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_factors_settings_good_ztc_audit_scores', 'get', metadata);
  }

  /**
   * Get "iss_factors_settings_low_ztc_audit_scores" issues in a scorecard
   *
   * @summary Get "iss_factors_settings_low_ztc_audit_scores" is
   */
  getCompaniesScorecard_identifierIssuesIss_factors_settings_low_ztc_audit_scores(metadata: types.GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsLowZtcAuditScoresMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsLowZtcAuditScoresResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_factors_settings_low_ztc_audit_scores', 'get', metadata);
  }

  /**
   * Get "iss_factors_settings_medium_ztc_audit_scores" issues in a scorecard
   *
   * @summary Get "iss_factors_settings_medium_ztc_audit_scores"
   */
  getCompaniesScorecard_identifierIssuesIss_factors_settings_medium_ztc_audit_scores(metadata: types.GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsMediumZtcAuditScoresMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsMediumZtcAuditScoresResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_factors_settings_medium_ztc_audit_scores', 'get', metadata);
  }

  /**
   * Get "iss_factors_settings_very_low_ztc_audit_scores" issues in a scorecard
   *
   * @summary Get "iss_factors_settings_very_low_ztc_audit_score
   */
  getCompaniesScorecard_identifierIssuesIss_factors_settings_very_low_ztc_audit_scores(metadata: types.GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsVeryLowZtcAuditScoresMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsVeryLowZtcAuditScoresResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_factors_settings_very_low_ztc_audit_scores', 'get', metadata);
  }

  /**
   * Get "iss_failed_2fa_authentication" issues in a scorecard
   *
   * @summary Get "iss_failed_2fa_authentication" issues in a sc
   */
  getCompaniesScorecard_identifierIssuesIss_failed_2fa_authentication(metadata: types.GetCompaniesScorecardIdentifierIssuesIssFailed2FaAuthenticationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssFailed2FaAuthenticationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_failed_2fa_authentication', 'get', metadata);
  }

  /**
   * Get "iss_gateway_antivirus_present" issues in a scorecard
   *
   * @summary Get "iss_gateway_antivirus_present" issues in a sc
   */
  getCompaniesScorecard_identifierIssuesIss_gateway_antivirus_present(metadata: types.GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusPresentMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusPresentResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_gateway_antivirus_present', 'get', metadata);
  }

  /**
   * Get "iss_gateway_antivirus_service_expired" issues in a scorecard
   *
   * @summary Get "iss_gateway_antivirus_service_expired" issues
   */
  getCompaniesScorecard_identifierIssuesIss_gateway_antivirus_service_expired(metadata: types.GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusServiceExpiredMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusServiceExpiredResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_gateway_antivirus_service_expired', 'get', metadata);
  }

  /**
   * Get "iss_gateway_antivirus_service_not_valid" issues in a scorecard
   *
   * @summary Get "iss_gateway_antivirus_service_not_valid" issu
   */
  getCompaniesScorecard_identifierIssuesIss_gateway_antivirus_service_not_valid(metadata: types.GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusServiceNotValidMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusServiceNotValidResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_gateway_antivirus_service_not_valid', 'get', metadata);
  }

  /**
   * Get "iss_gateway_antivirus_service_valid" issues in a scorecard
   *
   * @summary Get "iss_gateway_antivirus_service_valid" issues i
   */
  getCompaniesScorecard_identifierIssuesIss_gateway_antivirus_service_valid(metadata: types.GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusServiceValidMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusServiceValidResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_gateway_antivirus_service_valid', 'get', metadata);
  }

  /**
   * Get "iss_gateway_antivirus_signatures_out_of_date" issues in a scorecard
   *
   * @summary Get "iss_gateway_antivirus_signatures_out_of_date"
   */
  getCompaniesScorecard_identifierIssuesIss_gateway_antivirus_signatures_out_of_date(metadata: types.GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusSignaturesOutOfDateMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusSignaturesOutOfDateResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_gateway_antivirus_signatures_out_of_date', 'get', metadata);
  }

  /**
   * Get "iss_gateway_antivirus_signatures_updated" issues in a scorecard
   *
   * @summary Get "iss_gateway_antivirus_signatures_updated" iss
   */
  getCompaniesScorecard_identifierIssuesIss_gateway_antivirus_signatures_updated(metadata: types.GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusSignaturesUpdatedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusSignaturesUpdatedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_gateway_antivirus_signatures_updated', 'get', metadata);
  }

  /**
   * Get "iss_good_overall_ztc_audit_score" issues in a scorecard
   *
   * @summary Get "iss_good_overall_ztc_audit_score" issues in a
   */
  getCompaniesScorecard_identifierIssuesIss_good_overall_ztc_audit_score(metadata: types.GetCompaniesScorecardIdentifierIssuesIssGoodOverallZtcAuditScoreMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssGoodOverallZtcAuditScoreResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_good_overall_ztc_audit_score', 'get', metadata);
  }

  /**
   * Get "iss_host_based_firewall_present" issues in a scorecard
   *
   * @summary Get "iss_host_based_firewall_present" issues in a 
   */
  getCompaniesScorecard_identifierIssuesIss_host_based_firewall_present(metadata: types.GetCompaniesScorecardIdentifierIssuesIssHostBasedFirewallPresentMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssHostBasedFirewallPresentResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_host_based_firewall_present', 'get', metadata);
  }

  /**
   * Get "iss_host_vulnerable_to_cve_detected" issues in a scorecard
   *
   * @summary Get "iss_host_vulnerable_to_cve_detected" issues i
   */
  getCompaniesScorecard_identifierIssuesIss_host_vulnerable_to_cve_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesIssHostVulnerableToCveDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssHostVulnerableToCveDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_host_vulnerable_to_cve_detected', 'get', metadata);
  }

  /**
   * Get "iss_http_antivirus_scan_enabled" issues in a scorecard
   *
   * @summary Get "iss_http_antivirus_scan_enabled" issues in a 
   */
  getCompaniesScorecard_identifierIssuesIss_http_antivirus_scan_enabled(metadata: types.GetCompaniesScorecardIdentifierIssuesIssHttpAntivirusScanEnabledMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssHttpAntivirusScanEnabledResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_http_antivirus_scan_enabled', 'get', metadata);
  }

  /**
   * Get "iss_incident_closed" issues in a scorecard
   *
   * @summary Get "iss_incident_closed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesIss_incident_closed(metadata: types.GetCompaniesScorecardIdentifierIssuesIssIncidentClosedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssIncidentClosedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_incident_closed', 'get', metadata);
  }

  /**
   * Get "iss_incident_detected" issues in a scorecard
   *
   * @summary Get "iss_incident_detected" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesIss_incident_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesIssIncidentDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssIncidentDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_incident_detected', 'get', metadata);
  }

  /**
   * Get "iss_low_average_overall_ztc_audit_score" issues in a scorecard
   *
   * @summary Get "iss_low_average_overall_ztc_audit_score" issu
   */
  getCompaniesScorecard_identifierIssuesIss_low_average_overall_ztc_audit_score(metadata: types.GetCompaniesScorecardIdentifierIssuesIssLowAverageOverallZtcAuditScoreMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssLowAverageOverallZtcAuditScoreResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_low_average_overall_ztc_audit_score', 'get', metadata);
  }

  /**
   * Get "iss_medium_overall_ztc_audit_score" issues in a scorecard
   *
   * @summary Get "iss_medium_overall_ztc_audit_score" issues in
   */
  getCompaniesScorecard_identifierIssuesIss_medium_overall_ztc_audit_score(metadata: types.GetCompaniesScorecardIdentifierIssuesIssMediumOverallZtcAuditScoreMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssMediumOverallZtcAuditScoreResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_medium_overall_ztc_audit_score', 'get', metadata);
  }

  /**
   * Get "iss_object_storage_buckets_allow_public_access" issues in a scorecard
   *
   * @summary Get "iss_object_storage_buckets_allow_public_acces
   */
  getCompaniesScorecard_identifierIssuesIss_object_storage_buckets_allow_public_access(metadata: types.GetCompaniesScorecardIdentifierIssuesIssObjectStorageBucketsAllowPublicAccessMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssObjectStorageBucketsAllowPublicAccessResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_object_storage_buckets_allow_public_access', 'get', metadata);
  }

  /**
   * Get "iss_object_storage_buckets_not_encrypted" issues in a scorecard
   *
   * @summary Get "iss_object_storage_buckets_not_encrypted" iss
   */
  getCompaniesScorecard_identifierIssuesIss_object_storage_buckets_not_encrypted(metadata: types.GetCompaniesScorecardIdentifierIssuesIssObjectStorageBucketsNotEncryptedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssObjectStorageBucketsNotEncryptedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_object_storage_buckets_not_encrypted', 'get', metadata);
  }

  /**
   * Get "iss_os_settings_not_meet_zero_trust_requirements" issues in a scorecard
   *
   * @summary Get "iss_os_settings_not_meet_zero_trust_requireme
   */
  getCompaniesScorecard_identifierIssuesIss_os_settings_not_meet_zero_trust_requirements(metadata: types.GetCompaniesScorecardIdentifierIssuesIssOsSettingsNotMeetZeroTrustRequirementsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssOsSettingsNotMeetZeroTrustRequirementsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_os_settings_not_meet_zero_trust_requirements', 'get', metadata);
  }

  /**
   * Get "iss_out_of_date_endpoint_security" issues in a scorecard
   *
   * @summary Get "iss_out_of_date_endpoint_security" issues in 
   */
  getCompaniesScorecard_identifierIssuesIss_out_of_date_endpoint_security(metadata: types.GetCompaniesScorecardIdentifierIssuesIssOutOfDateEndpointSecurityMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssOutOfDateEndpointSecurityResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_out_of_date_endpoint_security', 'get', metadata);
  }

  /**
   * Get "iss_out_of_date_firmware" issues in a scorecard
   *
   * @summary Get "iss_out_of_date_firmware" issues in a scoreca
   */
  getCompaniesScorecard_identifierIssuesIss_out_of_date_firmware(metadata: types.GetCompaniesScorecardIdentifierIssuesIssOutOfDateFirmwareMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssOutOfDateFirmwareResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_out_of_date_firmware', 'get', metadata);
  }

  /**
   * Get "iss_out_of_date_operating_system" issues in a scorecard
   *
   * @summary Get "iss_out_of_date_operating_system" issues in a
   */
  getCompaniesScorecard_identifierIssuesIss_out_of_date_operating_system(metadata: types.GetCompaniesScorecardIdentifierIssuesIssOutOfDateOperatingSystemMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssOutOfDateOperatingSystemResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_out_of_date_operating_system', 'get', metadata);
  }

  /**
   * Get "iss_password_policy_allows_reuse" issues in a scorecard
   *
   * @summary Get "iss_password_policy_allows_reuse" issues in a
   */
  getCompaniesScorecard_identifierIssuesIss_password_policy_allows_reuse(metadata: types.GetCompaniesScorecardIdentifierIssuesIssPasswordPolicyAllowsReuseMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssPasswordPolicyAllowsReuseResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_password_policy_allows_reuse', 'get', metadata);
  }

  /**
   * Get "iss_password_policy_no_regular_updates" issues in a scorecard
   *
   * @summary Get "iss_password_policy_no_regular_updates" issue
   */
  getCompaniesScorecard_identifierIssuesIss_password_policy_no_regular_updates(metadata: types.GetCompaniesScorecardIdentifierIssuesIssPasswordPolicyNoRegularUpdatesMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssPasswordPolicyNoRegularUpdatesResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_password_policy_no_regular_updates', 'get', metadata);
  }

  /**
   * Get "iss_persistent_disks_not_encrypted" issues in a scorecard
   *
   * @summary Get "iss_persistent_disks_not_encrypted" issues in
   */
  getCompaniesScorecard_identifierIssuesIss_persistent_disks_not_encrypted(metadata: types.GetCompaniesScorecardIdentifierIssuesIssPersistentDisksNotEncryptedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssPersistentDisksNotEncryptedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_persistent_disks_not_encrypted', 'get', metadata);
  }

  /**
   * Get "iss_queues_encrypted_with_provider_managed_key" issues in a scorecard
   *
   * @summary Get "iss_queues_encrypted_with_provider_managed_ke
   */
  getCompaniesScorecard_identifierIssuesIss_queues_encrypted_with_provider_managed_key(metadata: types.GetCompaniesScorecardIdentifierIssuesIssQueuesEncryptedWithProviderManagedKeyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssQueuesEncryptedWithProviderManagedKeyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_queues_encrypted_with_provider_managed_key', 'get', metadata);
  }

  /**
   * Get "iss_queues_not_encrypted" issues in a scorecard
   *
   * @summary Get "iss_queues_not_encrypted" issues in a scoreca
   */
  getCompaniesScorecard_identifierIssuesIss_queues_not_encrypted(metadata: types.GetCompaniesScorecardIdentifierIssuesIssQueuesNotEncryptedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssQueuesNotEncryptedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_queues_not_encrypted', 'get', metadata);
  }

  /**
   * Get "iss_root_account_has_access_keys" issues in a scorecard
   *
   * @summary Get "iss_root_account_has_access_keys" issues in a
   */
  getCompaniesScorecard_identifierIssuesIss_root_account_has_access_keys(metadata: types.GetCompaniesScorecardIdentifierIssuesIssRootAccountHasAccessKeysMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssRootAccountHasAccessKeysResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_root_account_has_access_keys', 'get', metadata);
  }

  /**
   * Get "iss_root_account_without_mfa_enabled" issues in a scorecard
   *
   * @summary Get "iss_root_account_without_mfa_enabled" issues 
   */
  getCompaniesScorecard_identifierIssuesIss_root_account_without_mfa_enabled(metadata: types.GetCompaniesScorecardIdentifierIssuesIssRootAccountWithoutMfaEnabledMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssRootAccountWithoutMfaEnabledResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_root_account_without_mfa_enabled', 'get', metadata);
  }

  /**
   * Get "iss_sensor_policies_not_meet_zero_trust_requirements" issues in a scorecard
   *
   * @summary Get "iss_sensor_policies_not_meet_zero_trust_requi
   */
  getCompaniesScorecard_identifierIssuesIss_sensor_policies_not_meet_zero_trust_requirements(metadata: types.GetCompaniesScorecardIdentifierIssuesIssSensorPoliciesNotMeetZeroTrustRequirementsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssSensorPoliciesNotMeetZeroTrustRequirementsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_sensor_policies_not_meet_zero_trust_requirements', 'get', metadata);
  }

  /**
   * Get "iss_strong_minimum_password_length_set" issues in a scorecard
   *
   * @summary Get "iss_strong_minimum_password_length_set" issue
   */
  getCompaniesScorecard_identifierIssuesIss_strong_minimum_password_length_set(metadata: types.GetCompaniesScorecardIdentifierIssuesIssStrongMinimumPasswordLengthSetMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssStrongMinimumPasswordLengthSetResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_strong_minimum_password_length_set', 'get', metadata);
  }

  /**
   * Get "iss_threat_detected" issues in a scorecard
   *
   * @summary Get "iss_threat_detected" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesIss_threat_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesIssThreatDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssThreatDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_threat_detected', 'get', metadata);
  }

  /**
   * Get "iss_threat_remediated" issues in a scorecard
   *
   * @summary Get "iss_threat_remediated" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesIss_threat_remediated(metadata: types.GetCompaniesScorecardIdentifierIssuesIssThreatRemediatedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssThreatRemediatedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_threat_remediated', 'get', metadata);
  }

  /**
   * Get "iss_users_with_access_keys_not_rotated_regularly" issues in a scorecard
   *
   * @summary Get "iss_users_with_access_keys_not_rotated_regula
   */
  getCompaniesScorecard_identifierIssuesIss_users_with_access_keys_not_rotated_regularly(metadata: types.GetCompaniesScorecardIdentifierIssuesIssUsersWithAccessKeysNotRotatedRegularlyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssUsersWithAccessKeysNotRotatedRegularlyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_users_with_access_keys_not_rotated_regularly', 'get', metadata);
  }

  /**
   * Get "iss_users_with_passwords_not_rotated_regularly" issues in a scorecard
   *
   * @summary Get "iss_users_with_passwords_not_rotated_regularl
   */
  getCompaniesScorecard_identifierIssuesIss_users_with_passwords_not_rotated_regularly(metadata: types.GetCompaniesScorecardIdentifierIssuesIssUsersWithPasswordsNotRotatedRegularlyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssUsersWithPasswordsNotRotatedRegularlyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_users_with_passwords_not_rotated_regularly', 'get', metadata);
  }

  /**
   * Get "iss_users_with_unused_access_keys" issues in a scorecard
   *
   * @summary Get "iss_users_with_unused_access_keys" issues in 
   */
  getCompaniesScorecard_identifierIssuesIss_users_with_unused_access_keys(metadata: types.GetCompaniesScorecardIdentifierIssuesIssUsersWithUnusedAccessKeysMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssUsersWithUnusedAccessKeysResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_users_with_unused_access_keys', 'get', metadata);
  }

  /**
   * Get "iss_users_with_unused_passwords" issues in a scorecard
   *
   * @summary Get "iss_users_with_unused_passwords" issues in a 
   */
  getCompaniesScorecard_identifierIssuesIss_users_with_unused_passwords(metadata: types.GetCompaniesScorecardIdentifierIssuesIssUsersWithUnusedPasswordsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssUsersWithUnusedPasswordsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_users_with_unused_passwords', 'get', metadata);
  }

  /**
   * Get "iss_very_low_overall_ztc_audit_score" issues in a scorecard
   *
   * @summary Get "iss_very_low_overall_ztc_audit_score" issues 
   */
  getCompaniesScorecard_identifierIssuesIss_very_low_overall_ztc_audit_score(metadata: types.GetCompaniesScorecardIdentifierIssuesIssVeryLowOverallZtcAuditScoreMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesIssVeryLowOverallZtcAuditScoreResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/iss_very_low_overall_ztc_audit_score', 'get', metadata);
  }

  /**
   * Get "java_debugger" issues in a scorecard
   *
   * @summary Get "java_debugger" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesJava_debugger(metadata: types.GetCompaniesScorecardIdentifierIssuesJavaDebuggerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesJavaDebuggerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/java_debugger', 'get', metadata);
  }

  /**
   * Get "known_compromised_or_hostile_host" issues in a scorecard
   *
   * @summary Get "known_compromised_or_hostile_host" issues in 
   */
  getCompaniesScorecard_identifierIssuesKnown_compromised_or_hostile_host(metadata: types.GetCompaniesScorecardIdentifierIssuesKnownCompromisedOrHostileHostMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesKnownCompromisedOrHostileHostResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/known_compromised_or_hostile_host', 'get', metadata);
  }

  /**
   * Get "language_exposed" issues in a scorecard
   *
   * @summary Get "language_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesLanguage_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesLanguageExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesLanguageExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/language_exposed', 'get', metadata);
  }

  /**
   * Get "leaked_credentials" issues in a scorecard
   *
   * @summary Get "leaked_credentials" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesLeaked_credentials(metadata: types.GetCompaniesScorecardIdentifierIssuesLeakedCredentialsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesLeakedCredentialsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/leaked_credentials', 'get', metadata);
  }

  /**
   * Get "leaked_credentials_info" issues in a scorecard
   *
   * @summary Get "leaked_credentials_info" issues in a scorecar
   */
  getCompaniesScorecard_identifierIssuesLeaked_credentials_info(metadata: types.GetCompaniesScorecardIdentifierIssuesLeakedCredentialsInfoMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesLeakedCredentialsInfoResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/leaked_credentials_info', 'get', metadata);
  }

  /**
   * Get "links_to_insecure_website" issues in a scorecard
   *
   * @summary Get "links_to_insecure_website" issues in a scorec
   */
  getCompaniesScorecard_identifierIssuesLinks_to_insecure_website(metadata: types.GetCompaniesScorecardIdentifierIssuesLinksToInsecureWebsiteMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesLinksToInsecureWebsiteResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/links_to_insecure_website', 'get', metadata);
  }

  /**
   * Get "local_file_path_exposed_via_url_scheme" issues in a scorecard
   *
   * @summary Get "local_file_path_exposed_via_url_scheme" issue
   */
  getCompaniesScorecard_identifierIssuesLocal_file_path_exposed_via_url_scheme(metadata: types.GetCompaniesScorecardIdentifierIssuesLocalFilePathExposedViaUrlSchemeMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesLocalFilePathExposedViaUrlSchemeResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/local_file_path_exposed_via_url_scheme', 'get', metadata);
  }

  /**
   * Get "mail_server_unusual_port" issues in a scorecard
   *
   * @summary Get "mail_server_unusual_port" issues in a scoreca
   */
  getCompaniesScorecard_identifierIssuesMail_server_unusual_port(metadata: types.GetCompaniesScorecardIdentifierIssuesMailServerUnusualPortMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMailServerUnusualPortResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/mail_server_unusual_port', 'get', metadata);
  }

  /**
   * Get "malicious_botnet_c_and_c_server_detected" issues in a scorecard
   *
   * @summary Get "malicious_botnet_c_and_c_server_detected" iss
   */
  getCompaniesScorecard_identifierIssuesMalicious_botnet_c_and_c_server_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesMaliciousBotnetCAndCServerDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMaliciousBotnetCAndCServerDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/malicious_botnet_c_and_c_server_detected', 'get', metadata);
  }

  /**
   * Get "malicious_scan_detected" issues in a scorecard
   *
   * @summary Get "malicious_scan_detected" issues in a scorecar
   */
  getCompaniesScorecard_identifierIssuesMalicious_scan_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesMaliciousScanDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMaliciousScanDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/malicious_scan_detected', 'get', metadata);
  }

  /**
   * Get "malicious_tor_exit_node_detected" issues in a scorecard
   *
   * @summary Get "malicious_tor_exit_node_detected" issues in a
   */
  getCompaniesScorecard_identifierIssuesMalicious_tor_exit_node_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesMaliciousTorExitNodeDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMaliciousTorExitNodeDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/malicious_tor_exit_node_detected', 'get', metadata);
  }

  /**
   * Get "malicious_tor_relay_router_node_detected" issues in a scorecard
   *
   * @summary Get "malicious_tor_relay_router_node_detected" iss
   */
  getCompaniesScorecard_identifierIssuesMalicious_tor_relay_router_node_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesMaliciousTorRelayRouterNodeDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMaliciousTorRelayRouterNodeDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/malicious_tor_relay_router_node_detected', 'get', metadata);
  }

  /**
   * Get "malicious_user_agent_detected" issues in a scorecard
   *
   * @summary Get "malicious_user_agent_detected" issues in a sc
   */
  getCompaniesScorecard_identifierIssuesMalicious_user_agent_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesMaliciousUserAgentDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMaliciousUserAgentDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/malicious_user_agent_detected', 'get', metadata);
  }

  /**
   * Get "malware_controller" issues in a scorecard
   *
   * @summary Get "malware_controller" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesMalware_controller(metadata: types.GetCompaniesScorecardIdentifierIssuesMalwareControllerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMalwareControllerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/malware_controller', 'get', metadata);
  }

  /**
   * Get "malware_detected" issues in a scorecard
   *
   * @summary Get "malware_detected" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesMalware_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesMalwareDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMalwareDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/malware_detected', 'get', metadata);
  }

  /**
   * Get "malware_infection" issues in a scorecard
   *
   * @summary Get "malware_infection" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesMalware_infection(metadata: types.GetCompaniesScorecardIdentifierIssuesMalwareInfectionMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMalwareInfectionResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/malware_infection', 'get', metadata);
  }

  /**
   * Get "malware_infection_trail" issues in a scorecard
   *
   * @summary Get "malware_infection_trail" issues in a scorecar
   */
  getCompaniesScorecard_identifierIssuesMalware_infection_trail(metadata: types.GetCompaniesScorecardIdentifierIssuesMalwareInfectionTrailMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMalwareInfectionTrailResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/malware_infection_trail', 'get', metadata);
  }

  /**
   * Get "microsoft_exchange_0_day_vulnerability" issues in a scorecard
   *
   * @summary Get "microsoft_exchange_0_day_vulnerability" issue
   */
  getCompaniesScorecard_identifierIssuesMicrosoft_exchange_0_day_vulnerability(metadata: types.GetCompaniesScorecardIdentifierIssuesMicrosoftExchange0DayVulnerabilityMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMicrosoftExchange0DayVulnerabilityResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/microsoft_exchange_0_day_vulnerability', 'get', metadata);
  }

  /**
   * Get "microsoft_exchange_http_api_vulnerability" issues in a scorecard
   *
   * @summary Get "microsoft_exchange_http_api_vulnerability" is
   */
  getCompaniesScorecard_identifierIssuesMicrosoft_exchange_http_api_vulnerability(metadata: types.GetCompaniesScorecardIdentifierIssuesMicrosoftExchangeHttpApiVulnerabilityMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMicrosoftExchangeHttpApiVulnerabilityResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/microsoft_exchange_http_api_vulnerability', 'get', metadata);
  }

  /**
   * Get "minecraft_server" issues in a scorecard
   *
   * @summary Get "minecraft_server" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesMinecraft_server(metadata: types.GetCompaniesScorecardIdentifierIssuesMinecraftServerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMinecraftServerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/minecraft_server', 'get', metadata);
  }

  /**
   * Get "mirai_botnet_traffic_detected" issues in a scorecard
   *
   * @summary Get "mirai_botnet_traffic_detected" issues in a sc
   */
  getCompaniesScorecard_identifierIssuesMirai_botnet_traffic_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesMiraiBotnetTrafficDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMiraiBotnetTrafficDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/mirai_botnet_traffic_detected', 'get', metadata);
  }

  /**
   * Get "mysql_server_empty_password" issues in a scorecard
   *
   * @summary Get "mysql_server_empty_password" issues in a scor
   */
  getCompaniesScorecard_identifierIssuesMysql_server_empty_password(metadata: types.GetCompaniesScorecardIdentifierIssuesMysqlServerEmptyPasswordMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesMysqlServerEmptyPasswordResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/mysql_server_empty_password', 'get', metadata);
  }

  /**
   * Get "name_exposed" issues in a scorecard
   *
   * @summary Get "name_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesName_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesNameExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesNameExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/name_exposed', 'get', metadata);
  }

  /**
   * Get "non_social_media_access_token_exposed" issues in a scorecard
   *
   * @summary Get "non_social_media_access_token_exposed" issues
   */
  getCompaniesScorecard_identifierIssuesNon_social_media_access_token_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesNonSocialMediaAccessTokenExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesNonSocialMediaAccessTokenExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/non_social_media_access_token_exposed', 'get', metadata);
  }

  /**
   * Get "occupation_exposed" issues in a scorecard
   *
   * @summary Get "occupation_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesOccupation_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesOccupationExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesOccupationExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/occupation_exposed', 'get', metadata);
  }

  /**
   * Get "open_port" issues in a scorecard
   *
   * @summary Get "open_port" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesOpen_port(metadata: types.GetCompaniesScorecardIdentifierIssuesOpenPortMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesOpenPortResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/open_port', 'get', metadata);
  }

  /**
   * Get "openssl_critical_vulnerability" issues in a scorecard
   *
   * @summary Get "openssl_critical_vulnerability" issues in a s
   */
  getCompaniesScorecard_identifierIssuesOpenssl_critical_vulnerability(metadata: types.GetCompaniesScorecardIdentifierIssuesOpensslCriticalVulnerabilityMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesOpensslCriticalVulnerabilityResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/openssl_critical_vulnerability', 'get', metadata);
  }

  /**
   * Get "outdated_browser" issues in a scorecard
   *
   * @summary Get "outdated_browser" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesOutdated_browser(metadata: types.GetCompaniesScorecardIdentifierIssuesOutdatedBrowserMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesOutdatedBrowserResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/outdated_browser', 'get', metadata);
  }

  /**
   * Get "outdated_browser_domain" issues in a scorecard
   *
   * @summary Get "outdated_browser_domain" issues in a scorecar
   */
  getCompaniesScorecard_identifierIssuesOutdated_browser_domain(metadata: types.GetCompaniesScorecardIdentifierIssuesOutdatedBrowserDomainMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesOutdatedBrowserDomainResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/outdated_browser_domain', 'get', metadata);
  }

  /**
   * Get "outdated_os" issues in a scorecard
   *
   * @summary Get "outdated_os" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesOutdated_os(metadata: types.GetCompaniesScorecardIdentifierIssuesOutdatedOsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesOutdatedOsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/outdated_os', 'get', metadata);
  }

  /**
   * Get "outdated_os_domain" issues in a scorecard
   *
   * @summary Get "outdated_os_domain" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesOutdated_os_domain(metadata: types.GetCompaniesScorecardIdentifierIssuesOutdatedOsDomainMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesOutdatedOsDomainResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/outdated_os_domain', 'get', metadata);
  }

  /**
   * Get "parents_name_exposed" issues in a scorecard
   *
   * @summary Get "parents_name_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesParents_name_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesParentsNameExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesParentsNameExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/parents_name_exposed', 'get', metadata);
  }

  /**
   * Get "password_exposed" issues in a scorecard
   *
   * @summary Get "password_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPassword_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesPasswordExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPasswordExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/password_exposed', 'get', metadata);
  }

  /**
   * Get "password_hint_exposed" issues in a scorecard
   *
   * @summary Get "password_hint_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPassword_hint_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesPasswordHintExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPasswordHintExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/password_hint_exposed', 'get', metadata);
  }

  /**
   * Get "patching_analysis_high" issues in a scorecard
   *
   * @summary Get "patching_analysis_high" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPatching_analysis_high(metadata: types.GetCompaniesScorecardIdentifierIssuesPatchingAnalysisHighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPatchingAnalysisHighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/patching_analysis_high', 'get', metadata);
  }

  /**
   * Get "patching_analysis_low" issues in a scorecard
   *
   * @summary Get "patching_analysis_low" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPatching_analysis_low(metadata: types.GetCompaniesScorecardIdentifierIssuesPatchingAnalysisLowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPatchingAnalysisLowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/patching_analysis_low', 'get', metadata);
  }

  /**
   * Get "patching_analysis_medium" issues in a scorecard
   *
   * @summary Get "patching_analysis_medium" issues in a scoreca
   */
  getCompaniesScorecard_identifierIssuesPatching_analysis_medium(metadata: types.GetCompaniesScorecardIdentifierIssuesPatchingAnalysisMediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPatchingAnalysisMediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/patching_analysis_medium', 'get', metadata);
  }

  /**
   * Get "patching_cadence_critical" issues in a scorecard
   *
   * @summary Get "patching_cadence_critical" issues in a scorec
   */
  getCompaniesScorecard_identifierIssuesPatching_cadence_critical(metadata: types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceCriticalMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceCriticalResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/patching_cadence_critical', 'get', metadata);
  }

  /**
   * Get "patching_cadence_high" issues in a scorecard
   *
   * @summary Get "patching_cadence_high" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPatching_cadence_high(metadata: types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceHighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceHighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/patching_cadence_high', 'get', metadata);
  }

  /**
   * Get "patching_cadence_info" issues in a scorecard
   *
   * @summary Get "patching_cadence_info" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPatching_cadence_info(metadata: types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceInfoMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceInfoResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/patching_cadence_info', 'get', metadata);
  }

  /**
   * Get "patching_cadence_low" issues in a scorecard
   *
   * @summary Get "patching_cadence_low" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPatching_cadence_low(metadata: types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceLowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceLowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/patching_cadence_low', 'get', metadata);
  }

  /**
   * Get "patching_cadence_medium" issues in a scorecard
   *
   * @summary Get "patching_cadence_medium" issues in a scorecar
   */
  getCompaniesScorecard_identifierIssuesPatching_cadence_medium(metadata: types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceMediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceMediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/patching_cadence_medium', 'get', metadata);
  }

  /**
   * Get "patching_cadence_v3_critical" issues in a scorecard
   *
   * @summary Get "patching_cadence_v3_critical" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesPatching_cadence_v3_critical(metadata: types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3CriticalMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3CriticalResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/patching_cadence_v3_critical', 'get', metadata);
  }

  /**
   * Get "patching_cadence_v3_high" issues in a scorecard
   *
   * @summary Get "patching_cadence_v3_high" issues in a scoreca
   */
  getCompaniesScorecard_identifierIssuesPatching_cadence_v3_high(metadata: types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3HighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3HighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/patching_cadence_v3_high', 'get', metadata);
  }

  /**
   * Get "patching_cadence_v3_low" issues in a scorecard
   *
   * @summary Get "patching_cadence_v3_low" issues in a scorecar
   */
  getCompaniesScorecard_identifierIssuesPatching_cadence_v3_low(metadata: types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3LowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3LowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/patching_cadence_v3_low', 'get', metadata);
  }

  /**
   * Get "patching_cadence_v3_medium" issues in a scorecard
   *
   * @summary Get "patching_cadence_v3_medium" issues in a score
   */
  getCompaniesScorecard_identifierIssuesPatching_cadence_v3_medium(metadata: types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3MediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3MediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/patching_cadence_v3_medium', 'get', metadata);
  }

  /**
   * Get "payment_provider" issues in a scorecard
   *
   * @summary Get "payment_provider" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPayment_provider(metadata: types.GetCompaniesScorecardIdentifierIssuesPaymentProviderMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPaymentProviderResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/payment_provider', 'get', metadata);
  }

  /**
   * Get "phishing" issues in a scorecard
   *
   * @summary Get "phishing" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPhishing(metadata: types.GetCompaniesScorecardIdentifierIssuesPhishingMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPhishingResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/phishing', 'get', metadata);
  }

  /**
   * Get "phone_number_exposed" issues in a scorecard
   *
   * @summary Get "phone_number_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPhone_number_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesPhoneNumberExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPhoneNumberExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/phone_number_exposed', 'get', metadata);
  }

  /**
   * Get "physical_address_exposed" issues in a scorecard
   *
   * @summary Get "physical_address_exposed" issues in a scoreca
   */
  getCompaniesScorecard_identifierIssuesPhysical_address_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesPhysicalAddressExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPhysicalAddressExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/physical_address_exposed', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable" issues in a scorecard
   *
   * @summary Get "potentially_vulnerable" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPotentially_vulnerable(metadata: types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/potentially_vulnerable', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cisco_rv_320_325" issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cisco_rv_320_325" issu
   */
  getCompaniesScorecard_identifierIssuesPotentially_vulnerable_cisco_rv_320_325(metadata: types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCiscoRv320325MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCiscoRv320325Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/potentially_vulnerable_cisco_rv_320_325', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_33246" issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_33246" issues
   */
  getCompaniesScorecard_identifierIssuesPotentially_vulnerable_cve_2023_33246(metadata: types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202333246MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202333246Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/potentially_vulnerable_cve_2023_33246', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_34362" issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_34362" issues
   */
  getCompaniesScorecard_identifierIssuesPotentially_vulnerable_cve_2023_34362(metadata: types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202334362MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202334362Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/potentially_vulnerable_cve_2023_34362', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_3519" issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_3519" issues 
   */
  getCompaniesScorecard_identifierIssuesPotentially_vulnerable_cve_2023_3519(metadata: types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve20233519MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve20233519Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/potentially_vulnerable_cve_2023_3519', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_37582" issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_37582" issues
   */
  getCompaniesScorecard_identifierIssuesPotentially_vulnerable_cve_2023_37582(metadata: types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202337582MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202337582Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/potentially_vulnerable_cve_2023_37582', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_37979" issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_37979" issues
   */
  getCompaniesScorecard_identifierIssuesPotentially_vulnerable_cve_2023_37979(metadata: types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202337979MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202337979Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/potentially_vulnerable_cve_2023_37979', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_38035" issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_38035" issues
   */
  getCompaniesScorecard_identifierIssuesPotentially_vulnerable_cve_2023_38035(metadata: types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202338035MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202338035Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/potentially_vulnerable_cve_2023_38035', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_46747" issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_46747" issues
   */
  getCompaniesScorecard_identifierIssuesPotentially_vulnerable_cve_2023_46747(metadata: types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202346747MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202346747Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/potentially_vulnerable_cve_2023_46747', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2024_21887" issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2024_21887" issues
   */
  getCompaniesScorecard_identifierIssuesPotentially_vulnerable_cve_2024_21887(metadata: types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202421887MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202421887Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/potentially_vulnerable_cve_2024_21887', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2024_46805" issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2024_46805" issues
   */
  getCompaniesScorecard_identifierIssuesPotentially_vulnerable_cve_2024_46805(metadata: types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202446805MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202446805Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/potentially_vulnerable_cve_2024_46805', 'get', metadata);
  }

  /**
   * Get "product_exploited_by_ransomware_actors" issues in a scorecard
   *
   * @summary Get "product_exploited_by_ransomware_actors" issue
   */
  getCompaniesScorecard_identifierIssuesProduct_exploited_by_ransomware_actors(metadata: types.GetCompaniesScorecardIdentifierIssuesProductExploitedByRansomwareActorsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesProductExploitedByRansomwareActorsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/product_exploited_by_ransomware_actors', 'get', metadata);
  }

  /**
   * Get "product_uses_vulnerable_log4j" issues in a scorecard
   *
   * @summary Get "product_uses_vulnerable_log4j" issues in a sc
   */
  getCompaniesScorecard_identifierIssuesProduct_uses_vulnerable_log4j(metadata: types.GetCompaniesScorecardIdentifierIssuesProductUsesVulnerableLog4JMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesProductUsesVulnerableLog4JResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/product_uses_vulnerable_log4j', 'get', metadata);
  }

  /**
   * Get "pva_installation" issues in a scorecard
   *
   * @summary Get "pva_installation" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPva_installation(metadata: types.GetCompaniesScorecardIdentifierIssuesPvaInstallationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPvaInstallationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/pva_installation', 'get', metadata);
  }

  /**
   * Get "pva_installation_trail" issues in a scorecard
   *
   * @summary Get "pva_installation_trail" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesPva_installation_trail(metadata: types.GetCompaniesScorecardIdentifierIssuesPvaInstallationTrailMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesPvaInstallationTrailResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/pva_installation_trail', 'get', metadata);
  }

  /**
   * Get "race_exposed" issues in a scorecard
   *
   * @summary Get "race_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesRace_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesRaceExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesRaceExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/race_exposed', 'get', metadata);
  }

  /**
   * Get "ransomware_association" issues in a scorecard
   *
   * @summary Get "ransomware_association" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesRansomware_association(metadata: types.GetCompaniesScorecardIdentifierIssuesRansomwareAssociationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesRansomwareAssociationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/ransomware_association', 'get', metadata);
  }

  /**
   * Get "ransomware_infection" issues in a scorecard
   *
   * @summary Get "ransomware_infection" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesRansomware_infection(metadata: types.GetCompaniesScorecardIdentifierIssuesRansomwareInfectionMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesRansomwareInfectionResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/ransomware_infection', 'get', metadata);
  }

  /**
   * Get "ransomware_infection_trail" issues in a scorecard
   *
   * @summary Get "ransomware_infection_trail" issues in a score
   */
  getCompaniesScorecard_identifierIssuesRansomware_infection_trail(metadata: types.GetCompaniesScorecardIdentifierIssuesRansomwareInfectionTrailMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesRansomwareInfectionTrailResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/ransomware_infection_trail', 'get', metadata);
  }

  /**
   * Get "ransomware_victim" issues in a scorecard
   *
   * @summary Get "ransomware_victim" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesRansomware_victim(metadata: types.GetCompaniesScorecardIdentifierIssuesRansomwareVictimMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesRansomwareVictimResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/ransomware_victim', 'get', metadata);
  }

  /**
   * Get "redirect_chain_contains_http_v2" issues in a scorecard
   *
   * @summary Get "redirect_chain_contains_http_v2" issues in a 
   */
  getCompaniesScorecard_identifierIssuesRedirect_chain_contains_http_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesRedirectChainContainsHttpV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesRedirectChainContainsHttpV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/redirect_chain_contains_http_v2', 'get', metadata);
  }

  /**
   * Get "redirect_to_insecure_website" issues in a scorecard
   *
   * @summary Get "redirect_to_insecure_website" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesRedirect_to_insecure_website(metadata: types.GetCompaniesScorecardIdentifierIssuesRedirectToInsecureWebsiteMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesRedirectToInsecureWebsiteResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/redirect_to_insecure_website', 'get', metadata);
  }

  /**
   * Get "references_object_storage_v2" issues in a scorecard
   *
   * @summary Get "references_object_storage_v2" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesReferences_object_storage_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesReferencesObjectStorageV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesReferencesObjectStorageV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/references_object_storage_v2', 'get', metadata);
  }

  /**
   * Get "remote_access" issues in a scorecard
   *
   * @summary Get "remote_access" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesRemote_access(metadata: types.GetCompaniesScorecardIdentifierIssuesRemoteAccessMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesRemoteAccessResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/remote_access', 'get', metadata);
  }

  /**
   * Get "security_question_and_answer_exposed" issues in a scorecard
   *
   * @summary Get "security_question_and_answer_exposed" issues 
   */
  getCompaniesScorecard_identifierIssuesSecurity_question_and_answer_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesSecurityQuestionAndAnswerExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSecurityQuestionAndAnswerExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/security_question_and_answer_exposed', 'get', metadata);
  }

  /**
   * Get "sensitive_data_exposure_through_insecure_channel" issues in a scorecard
   *
   * @summary Get "sensitive_data_exposure_through_insecure_chan
   */
  getCompaniesScorecard_identifierIssuesSensitive_data_exposure_through_insecure_channel(metadata: types.GetCompaniesScorecardIdentifierIssuesSensitiveDataExposureThroughInsecureChannelMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSensitiveDataExposureThroughInsecureChannelResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/sensitive_data_exposure_through_insecure_channel', 'get', metadata);
  }

  /**
   * Get "server_error" issues in a scorecard
   *
   * @summary Get "server_error" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesServer_error(metadata: types.GetCompaniesScorecardIdentifierIssuesServerErrorMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServerErrorResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/server_error', 'get', metadata);
  }

  /**
   * Get "service_cassandra" issues in a scorecard
   *
   * @summary Get "service_cassandra" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_cassandra(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceCassandraMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceCassandraResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_cassandra', 'get', metadata);
  }

  /**
   * Get "service_cloud_provider" issues in a scorecard
   *
   * @summary Get "service_cloud_provider" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_cloud_provider(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceCloudProviderMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceCloudProviderResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_cloud_provider', 'get', metadata);
  }

  /**
   * Get "service_couchdb" issues in a scorecard
   *
   * @summary Get "service_couchdb" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_couchdb(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceCouchdbMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceCouchdbResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_couchdb', 'get', metadata);
  }

  /**
   * Get "service_dns" issues in a scorecard
   *
   * @summary Get "service_dns" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_dns(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceDnsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceDnsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_dns', 'get', metadata);
  }

  /**
   * Get "service_elasticsearch" issues in a scorecard
   *
   * @summary Get "service_elasticsearch" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_elasticsearch(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceElasticsearchMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceElasticsearchResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_elasticsearch', 'get', metadata);
  }

  /**
   * Get "service_end_of_life" issues in a scorecard
   *
   * @summary Get "service_end_of_life" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_end_of_life(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceEndOfLifeMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceEndOfLifeResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_end_of_life', 'get', metadata);
  }

  /**
   * Get "service_end_of_service" issues in a scorecard
   *
   * @summary Get "service_end_of_service" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_end_of_service(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceEndOfServiceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceEndOfServiceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_end_of_service', 'get', metadata);
  }

  /**
   * Get "service_ftp" issues in a scorecard
   *
   * @summary Get "service_ftp" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_ftp(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceFtpMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceFtpResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_ftp', 'get', metadata);
  }

  /**
   * Get "service_http_proxy" issues in a scorecard
   *
   * @summary Get "service_http_proxy" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_http_proxy(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceHttpProxyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceHttpProxyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_http_proxy', 'get', metadata);
  }

  /**
   * Get "service_imap" issues in a scorecard
   *
   * @summary Get "service_imap" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_imap(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceImapMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceImapResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_imap', 'get', metadata);
  }

  /**
   * Get "service_ldap" issues in a scorecard
   *
   * @summary Get "service_ldap" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_ldap(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceLdapMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceLdapResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_ldap', 'get', metadata);
  }

  /**
   * Get "service_ldap_anonymous" issues in a scorecard
   *
   * @summary Get "service_ldap_anonymous" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_ldap_anonymous(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceLdapAnonymousMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceLdapAnonymousResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_ldap_anonymous', 'get', metadata);
  }

  /**
   * Get "service_microsoft_sql" issues in a scorecard
   *
   * @summary Get "service_microsoft_sql" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_microsoft_sql(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceMicrosoftSqlMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceMicrosoftSqlResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_microsoft_sql', 'get', metadata);
  }

  /**
   * Get "service_mongodb" issues in a scorecard
   *
   * @summary Get "service_mongodb" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_mongodb(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceMongodbMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceMongodbResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_mongodb', 'get', metadata);
  }

  /**
   * Get "service_mysql" issues in a scorecard
   *
   * @summary Get "service_mysql" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_mysql(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceMysqlMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceMysqlResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_mysql', 'get', metadata);
  }

  /**
   * Get "service_neo4j" issues in a scorecard
   *
   * @summary Get "service_neo4j" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_neo4j(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceNeo4JMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceNeo4JResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_neo4j', 'get', metadata);
  }

  /**
   * Get "service_netbus_remote_access" issues in a scorecard
   *
   * @summary Get "service_netbus_remote_access" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesService_netbus_remote_access(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceNetbusRemoteAccessMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceNetbusRemoteAccessResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_netbus_remote_access', 'get', metadata);
  }

  /**
   * Get "service_networking" issues in a scorecard
   *
   * @summary Get "service_networking" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_networking(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceNetworkingMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceNetworkingResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_networking', 'get', metadata);
  }

  /**
   * Get "service_open_vpn" issues in a scorecard
   *
   * @summary Get "service_open_vpn" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_open_vpn(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceOpenVpnMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceOpenVpnResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_open_vpn', 'get', metadata);
  }

  /**
   * Get "service_oracle_db" issues in a scorecard
   *
   * @summary Get "service_oracle_db" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_oracle_db(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceOracleDbMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceOracleDbResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_oracle_db', 'get', metadata);
  }

  /**
   * Get "service_oracle_registry" issues in a scorecard
   *
   * @summary Get "service_oracle_registry" issues in a scorecar
   */
  getCompaniesScorecard_identifierIssuesService_oracle_registry(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceOracleRegistryMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceOracleRegistryResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_oracle_registry', 'get', metadata);
  }

  /**
   * Get "service_pop3" issues in a scorecard
   *
   * @summary Get "service_pop3" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_pop3(metadata: types.GetCompaniesScorecardIdentifierIssuesServicePop3MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServicePop3Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_pop3', 'get', metadata);
  }

  /**
   * Get "service_postgresql" issues in a scorecard
   *
   * @summary Get "service_postgresql" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_postgresql(metadata: types.GetCompaniesScorecardIdentifierIssuesServicePostgresqlMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServicePostgresqlResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_postgresql', 'get', metadata);
  }

  /**
   * Get "service_pptp" issues in a scorecard
   *
   * @summary Get "service_pptp" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_pptp(metadata: types.GetCompaniesScorecardIdentifierIssuesServicePptpMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServicePptpResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_pptp', 'get', metadata);
  }

  /**
   * Get "service_pulse_vpn" issues in a scorecard
   *
   * @summary Get "service_pulse_vpn" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_pulse_vpn(metadata: types.GetCompaniesScorecardIdentifierIssuesServicePulseVpnMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServicePulseVpnResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_pulse_vpn', 'get', metadata);
  }

  /**
   * Get "service_rdp" issues in a scorecard
   *
   * @summary Get "service_rdp" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_rdp(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceRdpMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceRdpResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_rdp', 'get', metadata);
  }

  /**
   * Get "service_redis" issues in a scorecard
   *
   * @summary Get "service_redis" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_redis(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceRedisMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceRedisResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_redis', 'get', metadata);
  }

  /**
   * Get "service_rsync" issues in a scorecard
   *
   * @summary Get "service_rsync" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_rsync(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceRsyncMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceRsyncResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_rsync', 'get', metadata);
  }

  /**
   * Get "service_smb" issues in a scorecard
   *
   * @summary Get "service_smb" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_smb(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceSmbMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceSmbResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_smb', 'get', metadata);
  }

  /**
   * Get "service_soap" issues in a scorecard
   *
   * @summary Get "service_soap" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_soap(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceSoapMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceSoapResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_soap', 'get', metadata);
  }

  /**
   * Get "service_socks_proxy" issues in a scorecard
   *
   * @summary Get "service_socks_proxy" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_socks_proxy(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceSocksProxyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceSocksProxyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_socks_proxy', 'get', metadata);
  }

  /**
   * Get "service_telnet" issues in a scorecard
   *
   * @summary Get "service_telnet" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_telnet(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceTelnetMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceTelnetResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_telnet', 'get', metadata);
  }

  /**
   * Get "service_vnc" issues in a scorecard
   *
   * @summary Get "service_vnc" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_vnc(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceVncMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceVncResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_vnc', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_critical" issues in a scorecard
   *
   * @summary Get "service_vuln_host_critical" issues in a score
   */
  getCompaniesScorecard_identifierIssuesService_vuln_host_critical(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostCriticalMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostCriticalResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_vuln_host_critical', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_high" issues in a scorecard
   *
   * @summary Get "service_vuln_host_high" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_vuln_host_high(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostHighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostHighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_vuln_host_high', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_info" issues in a scorecard
   *
   * @summary Get "service_vuln_host_info" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_vuln_host_info(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostInfoMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostInfoResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_vuln_host_info', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_low" issues in a scorecard
   *
   * @summary Get "service_vuln_host_low" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesService_vuln_host_low(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostLowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostLowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_vuln_host_low', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_medium" issues in a scorecard
   *
   * @summary Get "service_vuln_host_medium" issues in a scoreca
   */
  getCompaniesScorecard_identifierIssuesService_vuln_host_medium(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostMediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostMediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_vuln_host_medium', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_v3_critical" issues in a scorecard
   *
   * @summary Get "service_vuln_host_v3_critical" issues in a sc
   */
  getCompaniesScorecard_identifierIssuesService_vuln_host_v3_critical(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3CriticalMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3CriticalResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_vuln_host_v3_critical', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_v3_high" issues in a scorecard
   *
   * @summary Get "service_vuln_host_v3_high" issues in a scorec
   */
  getCompaniesScorecard_identifierIssuesService_vuln_host_v3_high(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3HighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3HighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_vuln_host_v3_high', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_v3_low" issues in a scorecard
   *
   * @summary Get "service_vuln_host_v3_low" issues in a scoreca
   */
  getCompaniesScorecard_identifierIssuesService_vuln_host_v3_low(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3LowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3LowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_vuln_host_v3_low', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_v3_medium" issues in a scorecard
   *
   * @summary Get "service_vuln_host_v3_medium" issues in a scor
   */
  getCompaniesScorecard_identifierIssuesService_vuln_host_v3_medium(metadata: types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3MediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3MediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/service_vuln_host_v3_medium', 'get', metadata);
  }

  /**
   * Get "site_emits_browser_log" issues in a scorecard
   *
   * @summary Get "site_emits_browser_log" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesSite_emits_browser_log(metadata: types.GetCompaniesScorecardIdentifierIssuesSiteEmitsBrowserLogMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSiteEmitsBrowserLogResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/site_emits_browser_log', 'get', metadata);
  }

  /**
   * Get "site_requests_data_over_insecure_channel" issues in a scorecard
   *
   * @summary Get "site_requests_data_over_insecure_channel" iss
   */
  getCompaniesScorecard_identifierIssuesSite_requests_data_over_insecure_channel(metadata: types.GetCompaniesScorecardIdentifierIssuesSiteRequestsDataOverInsecureChannelMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSiteRequestsDataOverInsecureChannelResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/site_requests_data_over_insecure_channel', 'get', metadata);
  }

  /**
   * Get "site_uses_hsts_preloading_v2" issues in a scorecard
   *
   * @summary Get "site_uses_hsts_preloading_v2" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesSite_uses_hsts_preloading_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesSiteUsesHstsPreloadingV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSiteUsesHstsPreloadingV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/site_uses_hsts_preloading_v2', 'get', metadata);
  }

  /**
   * Get "social_media_account_exposed" issues in a scorecard
   *
   * @summary Get "social_media_account_exposed" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesSocial_media_account_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesSocialMediaAccountExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSocialMediaAccountExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/social_media_account_exposed', 'get', metadata);
  }

  /**
   * Get "social_media_token_exposed" issues in a scorecard
   *
   * @summary Get "social_media_token_exposed" issues in a score
   */
  getCompaniesScorecard_identifierIssuesSocial_media_token_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesSocialMediaTokenExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSocialMediaTokenExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/social_media_token_exposed', 'get', metadata);
  }

  /**
   * Get "social_security_number_exposed" issues in a scorecard
   *
   * @summary Get "social_security_number_exposed" issues in a s
   */
  getCompaniesScorecard_identifierIssuesSocial_security_number_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesSocialSecurityNumberExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSocialSecurityNumberExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/social_security_number_exposed', 'get', metadata);
  }

  /**
   * Get "spa_browser" issues in a scorecard
   *
   * @summary Get "spa_browser" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesSpa_browser(metadata: types.GetCompaniesScorecardIdentifierIssuesSpaBrowserMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSpaBrowserResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/spa_browser', 'get', metadata);
  }

  /**
   * Get "spf_record_malformed" issues in a scorecard
   *
   * @summary Get "spf_record_malformed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesSpf_record_malformed(metadata: types.GetCompaniesScorecardIdentifierIssuesSpfRecordMalformedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSpfRecordMalformedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/spf_record_malformed', 'get', metadata);
  }

  /**
   * Get "spf_record_missing" issues in a scorecard
   *
   * @summary Get "spf_record_missing" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesSpf_record_missing(metadata: types.GetCompaniesScorecardIdentifierIssuesSpfRecordMissingMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSpfRecordMissingResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/spf_record_missing', 'get', metadata);
  }

  /**
   * Get "spf_record_softfail" issues in a scorecard
   *
   * @summary Get "spf_record_softfail" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesSpf_record_softfail(metadata: types.GetCompaniesScorecardIdentifierIssuesSpfRecordSoftfailMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSpfRecordSoftfailResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/spf_record_softfail', 'get', metadata);
  }

  /**
   * Get "spf_record_wildcard" issues in a scorecard
   *
   * @summary Get "spf_record_wildcard" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesSpf_record_wildcard(metadata: types.GetCompaniesScorecardIdentifierIssuesSpfRecordWildcardMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSpfRecordWildcardResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/spf_record_wildcard', 'get', metadata);
  }

  /**
   * Get "sql_payload_using_tor_proxy_detected" issues in a scorecard
   *
   * @summary Get "sql_payload_using_tor_proxy_detected" issues 
   */
  getCompaniesScorecard_identifierIssuesSql_payload_using_tor_proxy_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesSqlPayloadUsingTorProxyDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSqlPayloadUsingTorProxyDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/sql_payload_using_tor_proxy_detected', 'get', metadata);
  }

  /**
   * Get "ssh_weak_cipher" issues in a scorecard
   *
   * @summary Get "ssh_weak_cipher" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesSsh_weak_cipher(metadata: types.GetCompaniesScorecardIdentifierIssuesSshWeakCipherMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSshWeakCipherResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/ssh_weak_cipher', 'get', metadata);
  }

  /**
   * Get "ssh_weak_mac" issues in a scorecard
   *
   * @summary Get "ssh_weak_mac" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesSsh_weak_mac(metadata: types.GetCompaniesScorecardIdentifierIssuesSshWeakMacMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSshWeakMacResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/ssh_weak_mac', 'get', metadata);
  }

  /**
   * Get "ssh_weak_protocol" issues in a scorecard
   *
   * @summary Get "ssh_weak_protocol" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesSsh_weak_protocol(metadata: types.GetCompaniesScorecardIdentifierIssuesSshWeakProtocolMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSshWeakProtocolResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/ssh_weak_protocol', 'get', metadata);
  }

  /**
   * Get "suspicious_traffic" issues in a scorecard
   *
   * @summary Get "suspicious_traffic" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesSuspicious_traffic(metadata: types.GetCompaniesScorecardIdentifierIssuesSuspiciousTrafficMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesSuspiciousTrafficResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/suspicious_traffic', 'get', metadata);
  }

  /**
   * Get "telephony" issues in a scorecard
   *
   * @summary Get "telephony" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesTelephony(metadata: types.GetCompaniesScorecardIdentifierIssuesTelephonyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTelephonyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/telephony', 'get', metadata);
  }

  /**
   * Get "threat_actor_hosting_infrastructure" issues in a scorecard
   *
   * @summary Get "threat_actor_hosting_infrastructure" issues i
   */
  getCompaniesScorecard_identifierIssuesThreat_actor_hosting_infrastructure(metadata: types.GetCompaniesScorecardIdentifierIssuesThreatActorHostingInfrastructureMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesThreatActorHostingInfrastructureResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/threat_actor_hosting_infrastructure', 'get', metadata);
  }

  /**
   * Get "tls_ocsp_stapling" issues in a scorecard
   *
   * @summary Get "tls_ocsp_stapling" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesTls_ocsp_stapling(metadata: types.GetCompaniesScorecardIdentifierIssuesTlsOcspStaplingMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTlsOcspStaplingResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/tls_ocsp_stapling', 'get', metadata);
  }

  /**
   * Get "tls_weak_cipher" issues in a scorecard
   *
   * @summary Get "tls_weak_cipher" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesTls_weak_cipher(metadata: types.GetCompaniesScorecardIdentifierIssuesTlsWeakCipherMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTlsWeakCipherResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/tls_weak_cipher', 'get', metadata);
  }

  /**
   * Get "tls_weak_protocol" issues in a scorecard
   *
   * @summary Get "tls_weak_protocol" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesTls_weak_protocol(metadata: types.GetCompaniesScorecardIdentifierIssuesTlsWeakProtocolMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTlsWeakProtocolResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/tls_weak_protocol', 'get', metadata);
  }

  /**
   * Get "tlscert_excessive_expiration" issues in a scorecard
   *
   * @summary Get "tlscert_excessive_expiration" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesTlscert_excessive_expiration(metadata: types.GetCompaniesScorecardIdentifierIssuesTlscertExcessiveExpirationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTlscertExcessiveExpirationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/tlscert_excessive_expiration', 'get', metadata);
  }

  /**
   * Get "tlscert_expired" issues in a scorecard
   *
   * @summary Get "tlscert_expired" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesTlscert_expired(metadata: types.GetCompaniesScorecardIdentifierIssuesTlscertExpiredMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTlscertExpiredResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/tlscert_expired', 'get', metadata);
  }

  /**
   * Get "tlscert_no_revocation" issues in a scorecard
   *
   * @summary Get "tlscert_no_revocation" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesTlscert_no_revocation(metadata: types.GetCompaniesScorecardIdentifierIssuesTlscertNoRevocationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTlscertNoRevocationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/tlscert_no_revocation', 'get', metadata);
  }

  /**
   * Get "tlscert_revoked" issues in a scorecard
   *
   * @summary Get "tlscert_revoked" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesTlscert_revoked(metadata: types.GetCompaniesScorecardIdentifierIssuesTlscertRevokedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTlscertRevokedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/tlscert_revoked', 'get', metadata);
  }

  /**
   * Get "tlscert_self_signed" issues in a scorecard
   *
   * @summary Get "tlscert_self_signed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesTlscert_self_signed(metadata: types.GetCompaniesScorecardIdentifierIssuesTlscertSelfSignedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTlscertSelfSignedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/tlscert_self_signed', 'get', metadata);
  }

  /**
   * Get "tlscert_weak_signature" issues in a scorecard
   *
   * @summary Get "tlscert_weak_signature" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesTlscert_weak_signature(metadata: types.GetCompaniesScorecardIdentifierIssuesTlscertWeakSignatureMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTlscertWeakSignatureResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/tlscert_weak_signature', 'get', metadata);
  }

  /**
   * Get "tor_server" issues in a scorecard
   *
   * @summary Get "tor_server" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesTor_server(metadata: types.GetCompaniesScorecardIdentifierIssuesTorServerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTorServerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/tor_server', 'get', metadata);
  }

  /**
   * Get "tor_traffic_detected" issues in a scorecard
   *
   * @summary Get "tor_traffic_detected" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesTor_traffic_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesTorTrafficDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTorTrafficDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/tor_traffic_detected', 'get', metadata);
  }

  /**
   * Get "typosquat" issues in a scorecard
   *
   * @summary Get "typosquat" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesTyposquat(metadata: types.GetCompaniesScorecardIdentifierIssuesTyposquatMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesTyposquatResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/typosquat', 'get', metadata);
  }

  /**
   * Get "uce" issues in a scorecard
   *
   * @summary Get "uce" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesUce(metadata: types.GetCompaniesScorecardIdentifierIssuesUceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesUceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/uce', 'get', metadata);
  }

  /**
   * Get "unsafe_sri_v2" issues in a scorecard
   *
   * @summary Get "unsafe_sri_v2" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesUnsafe_sri_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesUnsafeSriV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesUnsafeSriV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/unsafe_sri_v2', 'get', metadata);
  }

  /**
   * Get "upnp_accessible" issues in a scorecard
   *
   * @summary Get "upnp_accessible" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesUpnp_accessible(metadata: types.GetCompaniesScorecardIdentifierIssuesUpnpAccessibleMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesUpnpAccessibleResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/upnp_accessible', 'get', metadata);
  }

  /**
   * Get "user_agent_string_exposed" issues in a scorecard
   *
   * @summary Get "user_agent_string_exposed" issues in a scorec
   */
  getCompaniesScorecard_identifierIssuesUser_agent_string_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesUserAgentStringExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesUserAgentStringExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/user_agent_string_exposed', 'get', metadata);
  }

  /**
   * Get "username_exposed" issues in a scorecard
   *
   * @summary Get "username_exposed" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesUsername_exposed(metadata: types.GetCompaniesScorecardIdentifierIssuesUsernameExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesUsernameExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/username_exposed', 'get', metadata);
  }

  /**
   * Get "uses_go_daddy_infrastructure" issues in a scorecard
   *
   * @summary Get "uses_go_daddy_infrastructure" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesUses_go_daddy_infrastructure(metadata: types.GetCompaniesScorecardIdentifierIssuesUsesGoDaddyInfrastructureMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesUsesGoDaddyInfrastructureResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/uses_go_daddy_infrastructure', 'get', metadata);
  }

  /**
   * Get "uses_go_daddy_managed_wordpress" issues in a scorecard
   *
   * @summary Get "uses_go_daddy_managed_wordpress" issues in a 
   */
  getCompaniesScorecard_identifierIssuesUses_go_daddy_managed_wordpress(metadata: types.GetCompaniesScorecardIdentifierIssuesUsesGoDaddyManagedWordpressMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesUsesGoDaddyManagedWordpressResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/uses_go_daddy_managed_wordpress', 'get', metadata);
  }

  /**
   * Get "uses_log4j" issues in a scorecard
   *
   * @summary Get "uses_log4j" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesUses_log4j(metadata: types.GetCompaniesScorecardIdentifierIssuesUsesLog4JMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesUsesLog4JResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/uses_log4j', 'get', metadata);
  }

  /**
   * Get "waf_detected_v2" issues in a scorecard
   *
   * @summary Get "waf_detected_v2" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesWaf_detected_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesWafDetectedV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWafDetectedV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/waf_detected_v2', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_critical" issues in a scorecard
   *
   * @summary Get "web_vuln_host_critical" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesWeb_vuln_host_critical(metadata: types.GetCompaniesScorecardIdentifierIssuesWebVulnHostCriticalMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebVulnHostCriticalResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/web_vuln_host_critical', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_high" issues in a scorecard
   *
   * @summary Get "web_vuln_host_high" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesWeb_vuln_host_high(metadata: types.GetCompaniesScorecardIdentifierIssuesWebVulnHostHighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebVulnHostHighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/web_vuln_host_high', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_low" issues in a scorecard
   *
   * @summary Get "web_vuln_host_low" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesWeb_vuln_host_low(metadata: types.GetCompaniesScorecardIdentifierIssuesWebVulnHostLowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebVulnHostLowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/web_vuln_host_low', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_medium" issues in a scorecard
   *
   * @summary Get "web_vuln_host_medium" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesWeb_vuln_host_medium(metadata: types.GetCompaniesScorecardIdentifierIssuesWebVulnHostMediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebVulnHostMediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/web_vuln_host_medium', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_v3_critical" issues in a scorecard
   *
   * @summary Get "web_vuln_host_v3_critical" issues in a scorec
   */
  getCompaniesScorecard_identifierIssuesWeb_vuln_host_v3_critical(metadata: types.GetCompaniesScorecardIdentifierIssuesWebVulnHostV3CriticalMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebVulnHostV3CriticalResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/web_vuln_host_v3_critical', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_v3_high" issues in a scorecard
   *
   * @summary Get "web_vuln_host_v3_high" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesWeb_vuln_host_v3_high(metadata: types.GetCompaniesScorecardIdentifierIssuesWebVulnHostV3HighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebVulnHostV3HighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/web_vuln_host_v3_high', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_v3_low" issues in a scorecard
   *
   * @summary Get "web_vuln_host_v3_low" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesWeb_vuln_host_v3_low(metadata: types.GetCompaniesScorecardIdentifierIssuesWebVulnHostV3LowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebVulnHostV3LowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/web_vuln_host_v3_low', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_v3_medium" issues in a scorecard
   *
   * @summary Get "web_vuln_host_v3_medium" issues in a scorecar
   */
  getCompaniesScorecard_identifierIssuesWeb_vuln_host_v3_medium(metadata: types.GetCompaniesScorecardIdentifierIssuesWebVulnHostV3MediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebVulnHostV3MediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/web_vuln_host_v3_medium', 'get', metadata);
  }

  /**
   * Get "webapp_vulnerable_to_spring4shell" issues in a scorecard
   *
   * @summary Get "webapp_vulnerable_to_spring4shell" issues in 
   */
  getCompaniesScorecard_identifierIssuesWebapp_vulnerable_to_spring4shell(metadata: types.GetCompaniesScorecardIdentifierIssuesWebappVulnerableToSpring4ShellMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebappVulnerableToSpring4ShellResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/webapp_vulnerable_to_spring4shell', 'get', metadata);
  }

  /**
   * Get "website_copyright_expired" issues in a scorecard
   *
   * @summary Get "website_copyright_expired" issues in a scorec
   */
  getCompaniesScorecard_identifierIssuesWebsite_copyright_expired(metadata: types.GetCompaniesScorecardIdentifierIssuesWebsiteCopyrightExpiredMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebsiteCopyrightExpiredResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/website_copyright_expired', 'get', metadata);
  }

  /**
   * Get "website_copyright_up_to_date" issues in a scorecard
   *
   * @summary Get "website_copyright_up_to_date" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesWebsite_copyright_up_to_date(metadata: types.GetCompaniesScorecardIdentifierIssuesWebsiteCopyrightUpToDateMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebsiteCopyrightUpToDateResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/website_copyright_up_to_date', 'get', metadata);
  }

  /**
   * Get "websocket_receives_data" issues in a scorecard
   *
   * @summary Get "websocket_receives_data" issues in a scorecar
   */
  getCompaniesScorecard_identifierIssuesWebsocket_receives_data(metadata: types.GetCompaniesScorecardIdentifierIssuesWebsocketReceivesDataMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebsocketReceivesDataResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/websocket_receives_data', 'get', metadata);
  }

  /**
   * Get "websocket_requests_contain_sensitive_fields" issues in a scorecard
   *
   * @summary Get "websocket_requests_contain_sensitive_fields" 
   */
  getCompaniesScorecard_identifierIssuesWebsocket_requests_contain_sensitive_fields(metadata: types.GetCompaniesScorecardIdentifierIssuesWebsocketRequestsContainSensitiveFieldsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebsocketRequestsContainSensitiveFieldsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/websocket_requests_contain_sensitive_fields', 'get', metadata);
  }

  /**
   * Get "websocket_sends_data" issues in a scorecard
   *
   * @summary Get "websocket_sends_data" issues in a scorecard
   */
  getCompaniesScorecard_identifierIssuesWebsocket_sends_data(metadata: types.GetCompaniesScorecardIdentifierIssuesWebsocketSendsDataMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesWebsocketSendsDataResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/websocket_sends_data', 'get', metadata);
  }

  /**
   * Get "x_content_type_options_incorrect_v2" issues in a scorecard
   *
   * @summary Get "x_content_type_options_incorrect_v2" issues i
   */
  getCompaniesScorecard_identifierIssuesX_content_type_options_incorrect_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesXContentTypeOptionsIncorrectV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesXContentTypeOptionsIncorrectV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/x_content_type_options_incorrect_v2', 'get', metadata);
  }

  /**
   * Get "x_frame_options_incorrect_v2" issues in a scorecard
   *
   * @summary Get "x_frame_options_incorrect_v2" issues in a sco
   */
  getCompaniesScorecard_identifierIssuesX_frame_options_incorrect_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesXFrameOptionsIncorrectV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesXFrameOptionsIncorrectV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/x_frame_options_incorrect_v2', 'get', metadata);
  }

  /**
   * Get "x_xss_protection_incorrect_v2" issues in a scorecard
   *
   * @summary Get "x_xss_protection_incorrect_v2" issues in a sc
   */
  getCompaniesScorecard_identifierIssuesX_xss_protection_incorrect_v2(metadata: types.GetCompaniesScorecardIdentifierIssuesXXssProtectionIncorrectV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesXXssProtectionIncorrectV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/x_xss_protection_incorrect_v2', 'get', metadata);
  }

  /**
   * Get "xss_payload_using_tor_proxy_detected" issues in a scorecard
   *
   * @summary Get "xss_payload_using_tor_proxy_detected" issues 
   */
  getCompaniesScorecard_identifierIssuesXss_payload_using_tor_proxy_detected(metadata: types.GetCompaniesScorecardIdentifierIssuesXssPayloadUsingTorProxyDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierIssuesXssPayloadUsingTorProxyDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/issues/xss_payload_using_tor_proxy_detected', 'get', metadata);
  }

  /**
   * Get "active_cve_exploitation_attempted" historical issues in a scorecard
   *
   * @summary Get "active_cve_exploitation_attempted" historical
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesActive_cve_exploitation_attempted(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesActiveCveExploitationAttemptedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesActiveCveExploitationAttemptedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/active_cve_exploitation_attempted/', 'get', metadata);
  }

  /**
   * Get "admin_subdomain_v2" historical issues in a scorecard
   *
   * @summary Get "admin_subdomain_v2" historical issues in a sc
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesAdmin_subdomain_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAdminSubdomainV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAdminSubdomainV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/admin_subdomain_v2/', 'get', metadata);
  }

  /**
   * Get "adware_installation" historical issues in a scorecard
   *
   * @summary Get "adware_installation" historical issues in a s
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesAdware_installation(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAdwareInstallationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAdwareInstallationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/adware_installation/', 'get', metadata);
  }

  /**
   * Get "adware_installation_trail" historical issues in a scorecard
   *
   * @summary Get "adware_installation_trail" historical issues 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesAdware_installation_trail(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAdwareInstallationTrailMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAdwareInstallationTrailResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/adware_installation_trail/', 'get', metadata);
  }

  /**
   * Get "age_exposed" historical issues in a scorecard
   *
   * @summary Get "age_exposed" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesAge_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAgeExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAgeExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/age_exposed/', 'get', metadata);
  }

  /**
   * Get "alleged_breach_incident" historical issues in a scorecard
   *
   * @summary Get "alleged_breach_incident" historical issues in
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesAlleged_breach_incident(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAllegedBreachIncidentMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAllegedBreachIncidentResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/alleged_breach_incident/', 'get', metadata);
  }

  /**
   * Get "anonymous_proxy" historical issues in a scorecard
   *
   * @summary Get "anonymous_proxy" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesAnonymous_proxy(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAnonymousProxyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAnonymousProxyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/anonymous_proxy/', 'get', metadata);
  }

  /**
   * Get "api_key_exposed" historical issues in a scorecard
   *
   * @summary Get "api_key_exposed" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesApi_key_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesApiKeyExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesApiKeyExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/api_key_exposed/', 'get', metadata);
  }

  /**
   * Get "attack_detected" historical issues in a scorecard
   *
   * @summary Get "attack_detected" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesAttack_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAttackDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAttackDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/attack_detected/', 'get', metadata);
  }

  /**
   * Get "attempted_information_leak" historical issues in a scorecard
   *
   * @summary Get "attempted_information_leak" historical issues
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesAttempted_information_leak(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAttemptedInformationLeakMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAttemptedInformationLeakResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/attempted_information_leak/', 'get', metadata);
  }

  /**
   * Get "birthday_exposed" historical issues in a scorecard
   *
   * @summary Get "birthday_exposed" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesBirthday_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesBirthdayExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesBirthdayExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/birthday_exposed/', 'get', metadata);
  }

  /**
   * Get "bitcoin_server" historical issues in a scorecard
   *
   * @summary Get "bitcoin_server" historical issues in a scorec
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesBitcoin_server(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesBitcoinServerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesBitcoinServerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/bitcoin_server/', 'get', metadata);
  }

  /**
   * Get "browser_logs_contain_debug_message" historical issues in a scorecard
   *
   * @summary Get "browser_logs_contain_debug_message" historica
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesBrowser_logs_contain_debug_message(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesBrowserLogsContainDebugMessageMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesBrowserLogsContainDebugMessageResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/browser_logs_contain_debug_message/', 'get', metadata);
  }

  /**
   * Get "cdn_hosting" historical issues in a scorecard
   *
   * @summary Get "cdn_hosting" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCdn_hosting(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCdnHostingMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCdnHostingResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/cdn_hosting/', 'get', metadata);
  }

  /**
   * Get "cleartext_password_exposed" historical issues in a scorecard
   *
   * @summary Get "cleartext_password_exposed" historical issues
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCleartext_password_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCleartextPasswordExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCleartextPasswordExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/cleartext_password_exposed/', 'get', metadata);
  }

  /**
   * Get "cobalt_strike_c2_detected" historical issues in a scorecard
   *
   * @summary Get "cobalt_strike_c2_detected" historical issues 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCobalt_strike_c2_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCobaltStrikeC2DetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCobaltStrikeC2DetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/cobalt_strike_c2_detected/', 'get', metadata);
  }

  /**
   * Get "cobalt_strike_c2_service" historical issues in a scorecard
   *
   * @summary Get "cobalt_strike_c2_service" historical issues i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCobalt_strike_c2_service(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCobaltStrikeC2ServiceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCobaltStrikeC2ServiceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/cobalt_strike_c2_service/', 'get', metadata);
  }

  /**
   * Get "communication_server_with_expired_cert" historical issues in a scorecard
   *
   * @summary Get "communication_server_with_expired_cert" histo
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCommunication_server_with_expired_cert(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCommunicationServerWithExpiredCertMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCommunicationServerWithExpiredCertResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/communication_server_with_expired_cert/', 'get', metadata);
  }

  /**
   * Get "communication_with_server_certificate_issued_by_blacklisted_country" historical
   * issues in a scorecard
   *
   * @summary Get "communication_with_server_certificate_issued_
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCommunication_with_server_certificate_issued_by_blacklisted_country(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCommunicationWithServerCertificateIssuedByBlacklistedCountryMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCommunicationWithServerCertificateIssuedByBlacklistedCountryResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/communication_with_server_certificate_issued_by_blacklisted_country/', 'get', metadata);
  }

  /**
   * Get "compromised_by_information_stealer" historical issues in a scorecard
   *
   * @summary Get "compromised_by_information_stealer" historica
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCompromised_by_information_stealer(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCompromisedByInformationStealerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCompromisedByInformationStealerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/compromised_by_information_stealer/', 'get', metadata);
  }

  /**
   * Get "compromised_credentials_found" historical issues in a scorecard
   *
   * @summary Get "compromised_credentials_found" historical iss
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCompromised_credentials_found(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCompromisedCredentialsFoundMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCompromisedCredentialsFoundResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/compromised_credentials_found/', 'get', metadata);
  }

  /**
   * Get "contact_information_detected" historical issues in a scorecard
   *
   * @summary Get "contact_information_detected" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesContact_information_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesContactInformationDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesContactInformationDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/contact_information_detected/', 'get', metadata);
  }

  /**
   * Get "cookie_missing_http_only" historical issues in a scorecard
   *
   * @summary Get "cookie_missing_http_only" historical issues i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCookie_missing_http_only(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCookieMissingHttpOnlyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCookieMissingHttpOnlyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/cookie_missing_http_only/', 'get', metadata);
  }

  /**
   * Get "cookie_missing_secure_attribute" historical issues in a scorecard
   *
   * @summary Get "cookie_missing_secure_attribute" historical i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCookie_missing_secure_attribute(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCookieMissingSecureAttributeMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCookieMissingSecureAttributeResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/cookie_missing_secure_attribute/', 'get', metadata);
  }

  /**
   * Get "csp_no_policy_v2" historical issues in a scorecard
   *
   * @summary Get "csp_no_policy_v2" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCsp_no_policy_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCspNoPolicyV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCspNoPolicyV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/csp_no_policy_v2/', 'get', metadata);
  }

  /**
   * Get "csp_too_broad_v2" historical issues in a scorecard
   *
   * @summary Get "csp_too_broad_v2" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCsp_too_broad_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCspTooBroadV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCspTooBroadV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/csp_too_broad_v2/', 'get', metadata);
  }

  /**
   * Get "csp_unsafe_policy_v2" historical issues in a scorecard
   *
   * @summary Get "csp_unsafe_policy_v2" historical issues in a 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCsp_unsafe_policy_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCspUnsafePolicyV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCspUnsafePolicyV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/csp_unsafe_policy_v2/', 'get', metadata);
  }

  /**
   * Get "cve_in_use_by_threat_actor" historical issues in a scorecard
   *
   * @summary Get "cve_in_use_by_threat_actor" historical issues
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesCve_in_use_by_threat_actor(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCveInUseByThreatActorMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCveInUseByThreatActorResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/cve_in_use_by_threat_actor/', 'get', metadata);
  }

  /**
   * Get "domain_missing_https_v2" historical issues in a scorecard
   *
   * @summary Get "domain_missing_https_v2" historical issues in
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesDomain_missing_https_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesDomainMissingHttpsV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesDomainMissingHttpsV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/domain_missing_https_v2/', 'get', metadata);
  }

  /**
   * Get "dos_attack_attempt_detected" historical issues in a scorecard
   *
   * @summary Get "dos_attack_attempt_detected" historical issue
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesDos_attack_attempt_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesDosAttackAttemptDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesDosAttackAttemptDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/dos_attack_attempt_detected/', 'get', metadata);
  }

  /**
   * Get "email_exposed" historical issues in a scorecard
   *
   * @summary Get "email_exposed" historical issues in a scoreca
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesEmail_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesEmailExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesEmailExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/email_exposed/', 'get', metadata);
  }

  /**
   * Get "employer_exposed" historical issues in a scorecard
   *
   * @summary Get "employer_exposed" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesEmployer_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesEmployerExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesEmployerExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/employer_exposed/', 'get', metadata);
  }

  /**
   * Get "exploit_attempt_detected" historical issues in a scorecard
   *
   * @summary Get "exploit_attempt_detected" historical issues i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesExploit_attempt_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExploitAttemptDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExploitAttemptDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/exploit_attempt_detected/', 'get', metadata);
  }

  /**
   * Get "exploited_product" historical issues in a scorecard
   *
   * @summary Get "exploited_product" historical issues in a sco
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesExploited_product(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExploitedProductMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExploitedProductResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/exploited_product/', 'get', metadata);
  }

  /**
   * Get "exposed_cisco_web_ui" historical issues in a scorecard
   *
   * @summary Get "exposed_cisco_web_ui" historical issues in a 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesExposed_cisco_web_ui(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedCiscoWebUiMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedCiscoWebUiResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/exposed_cisco_web_ui/', 'get', metadata);
  }

  /**
   * Get "exposed_embedded_iot_web_server" historical issues in a scorecard
   *
   * @summary Get "exposed_embedded_iot_web_server" historical i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesExposed_embedded_iot_web_server(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedEmbeddedIotWebServerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedEmbeddedIotWebServerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/exposed_embedded_iot_web_server/', 'get', metadata);
  }

  /**
   * Get "exposed_iscsi_device" historical issues in a scorecard
   *
   * @summary Get "exposed_iscsi_device" historical issues in a 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesExposed_iscsi_device(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedIscsiDeviceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedIscsiDeviceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/exposed_iscsi_device/', 'get', metadata);
  }

  /**
   * Get "exposed_mac_airport_device" historical issues in a scorecard
   *
   * @summary Get "exposed_mac_airport_device" historical issues
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesExposed_mac_airport_device(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedMacAirportDeviceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedMacAirportDeviceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/exposed_mac_airport_device/', 'get', metadata);
  }

  /**
   * Get "exposed_mobile_printing_service" historical issues in a scorecard
   *
   * @summary Get "exposed_mobile_printing_service" historical i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesExposed_mobile_printing_service(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedMobilePrintingServiceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedMobilePrintingServiceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/exposed_mobile_printing_service/', 'get', metadata);
  }

  /**
   * Get "exposed_network_attached_storage_device" historical issues in a scorecard
   *
   * @summary Get "exposed_network_attached_storage_device" hist
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesExposed_network_attached_storage_device(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedNetworkAttachedStorageDeviceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedNetworkAttachedStorageDeviceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/exposed_network_attached_storage_device/', 'get', metadata);
  }

  /**
   * Get "exposed_personal_information" historical issues in a scorecard
   *
   * @summary Get "exposed_personal_information" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesExposed_personal_information(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedPersonalInformationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedPersonalInformationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/exposed_personal_information/', 'get', metadata);
  }

  /**
   * Get "exposed_personal_information_info" historical issues in a scorecard
   *
   * @summary Get "exposed_personal_information_info" historical
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesExposed_personal_information_info(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedPersonalInformationInfoMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedPersonalInformationInfoResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/exposed_personal_information_info/', 'get', metadata);
  }

  /**
   * Get "exposed_printer" historical issues in a scorecard
   *
   * @summary Get "exposed_printer" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesExposed_printer(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedPrinterMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedPrinterResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/exposed_printer/', 'get', metadata);
  }

  /**
   * Get "fail_to_load_page_components" historical issues in a scorecard
   *
   * @summary Get "fail_to_load_page_components" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesFail_to_load_page_components(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesFailToLoadPageComponentsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesFailToLoadPageComponentsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/fail_to_load_page_components/', 'get', metadata);
  }

  /**
   * Get "general_scan_detected" historical issues in a scorecard
   *
   * @summary Get "general_scan_detected" historical issues in a
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesGeneral_scan_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesGeneralScanDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesGeneralScanDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/general_scan_detected/', 'get', metadata);
  }

  /**
   * Get "hashed_password_exposed" historical issues in a scorecard
   *
   * @summary Get "hashed_password_exposed" historical issues in
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesHashed_password_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHashedPasswordExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHashedPasswordExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/hashed_password_exposed/', 'get', metadata);
  }

  /**
   * Get "historical_compromised_credentials_found" historical issues in a scorecard
   *
   * @summary Get "historical_compromised_credentials_found" his
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesHistorical_compromised_credentials_found(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHistoricalCompromisedCredentialsFoundMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHistoricalCompromisedCredentialsFoundResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/historical_compromised_credentials_found/', 'get', metadata);
  }

  /**
   * Get "hosted_on_object_storage_v2" historical issues in a scorecard
   *
   * @summary Get "hosted_on_object_storage_v2" historical issue
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesHosted_on_object_storage_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHostedOnObjectStorageV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHostedOnObjectStorageV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/hosted_on_object_storage_v2/', 'get', metadata);
  }

  /**
   * Get "hsts_incorrect_v2" historical issues in a scorecard
   *
   * @summary Get "hsts_incorrect_v2" historical issues in a sco
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesHsts_incorrect_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHstsIncorrectV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHstsIncorrectV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/hsts_incorrect_v2/', 'get', metadata);
  }

  /**
   * Get "industrial_control_device" historical issues in a scorecard
   *
   * @summary Get "industrial_control_device" historical issues 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIndustrial_control_device(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIndustrialControlDeviceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIndustrialControlDeviceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/industrial_control_device/', 'get', metadata);
  }

  /**
   * Get "insecure_ftp" historical issues in a scorecard
   *
   * @summary Get "insecure_ftp" historical issues in a scorecar
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesInsecure_ftp(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureFtpMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureFtpResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/insecure_ftp/', 'get', metadata);
  }

  /**
   * Get "insecure_https_redirect_pattern_v2" historical issues in a scorecard
   *
   * @summary Get "insecure_https_redirect_pattern_v2" historica
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesInsecure_https_redirect_pattern_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureHttpsRedirectPatternV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureHttpsRedirectPatternV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/insecure_https_redirect_pattern_v2/', 'get', metadata);
  }

  /**
   * Get "insecure_server_certificate_key_size" historical issues in a scorecard
   *
   * @summary Get "insecure_server_certificate_key_size" histori
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesInsecure_server_certificate_key_size(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureServerCertificateKeySizeMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureServerCertificateKeySizeResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/insecure_server_certificate_key_size/', 'get', metadata);
  }

  /**
   * Get "insecure_telnet" historical issues in a scorecard
   *
   * @summary Get "insecure_telnet" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesInsecure_telnet(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureTelnetMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureTelnetResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/insecure_telnet/', 'get', metadata);
  }

  /**
   * Get "instant_messaging_account_exposed" historical issues in a scorecard
   *
   * @summary Get "instant_messaging_account_exposed" historical
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesInstant_messaging_account_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInstantMessagingAccountExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInstantMessagingAccountExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/instant_messaging_account_exposed/', 'get', metadata);
  }

  /**
   * Get "iot_camera" historical issues in a scorecard
   *
   * @summary Get "iot_camera" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIot_camera(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIotCameraMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIotCameraResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iot_camera/', 'get', metadata);
  }

  /**
   * Get "ip_address_exposed" historical issues in a scorecard
   *
   * @summary Get "ip_address_exposed" historical issues in a sc
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIp_address_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIpAddressExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIpAddressExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/ip_address_exposed/', 'get', metadata);
  }

  /**
   * Get "ip_black_list_due_malicious_activity" historical issues in a scorecard
   *
   * @summary Get "ip_black_list_due_malicious_activity" histori
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIp_black_list_due_malicious_activity(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIpBlackListDueMaliciousActivityMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIpBlackListDueMaliciousActivityResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/ip_black_list_due_malicious_activity/', 'get', metadata);
  }

  /**
   * Get "iss_account_lockout_threshold_enabled" historical issues in a scorecard
   *
   * @summary Get "iss_account_lockout_threshold_enabled" histor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_account_lockout_threshold_enabled(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssAccountLockoutThresholdEnabledMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssAccountLockoutThresholdEnabledResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_account_lockout_threshold_enabled/', 'get', metadata);
  }

  /**
   * Get "iss_admin_service_down" historical issues in a scorecard
   *
   * @summary Get "iss_admin_service_down" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_admin_service_down(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssAdminServiceDownMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssAdminServiceDownResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_admin_service_down/', 'get', metadata);
  }

  /**
   * Get "iss_all_device_sensor_policy_applied" historical issues in a scorecard
   *
   * @summary Get "iss_all_device_sensor_policy_applied" histori
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_all_device_sensor_policy_applied(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssAllDeviceSensorPolicyAppliedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssAllDeviceSensorPolicyAppliedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_all_device_sensor_policy_applied/', 'get', metadata);
  }

  /**
   * Get "iss_completed_vulnerability_management_scans" historical issues in a scorecard
   *
   * @summary Get "iss_completed_vulnerability_management_scans"
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_completed_vulnerability_management_scans(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssCompletedVulnerabilityManagementScansMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssCompletedVulnerabilityManagementScansResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_completed_vulnerability_management_scans/', 'get', metadata);
  }

  /**
   * Get "iss_database_instances_not_encrypted" historical issues in a scorecard
   *
   * @summary Get "iss_database_instances_not_encrypted" histori
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_database_instances_not_encrypted(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDatabaseInstancesNotEncryptedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDatabaseInstancesNotEncryptedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_database_instances_not_encrypted/', 'get', metadata);
  }

  /**
   * Get "iss_detected_cve_linux_instance" historical issues in a scorecard
   *
   * @summary Get "iss_detected_cve_linux_instance" historical i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_detected_cve_linux_instance(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedCveLinuxInstanceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedCveLinuxInstanceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_detected_cve_linux_instance/', 'get', metadata);
  }

  /**
   * Get "iss_detected_cve_windows_instance" historical issues in a scorecard
   *
   * @summary Get "iss_detected_cve_windows_instance" historical
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_detected_cve_windows_instance(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedCveWindowsInstanceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedCveWindowsInstanceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_detected_cve_windows_instance/', 'get', metadata);
  }

  /**
   * Get "iss_detected_os_in_cloud_vm" historical issues in a scorecard
   *
   * @summary Get "iss_detected_os_in_cloud_vm" historical issue
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_detected_os_in_cloud_vm(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedOsInCloudVmMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedOsInCloudVmResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_detected_os_in_cloud_vm/', 'get', metadata);
  }

  /**
   * Get "iss_detected_software_in_cloud_vm" historical issues in a scorecard
   *
   * @summary Get "iss_detected_software_in_cloud_vm" historical
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_detected_software_in_cloud_vm(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedSoftwareInCloudVmMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedSoftwareInCloudVmResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_detected_software_in_cloud_vm/', 'get', metadata);
  }

  /**
   * Get "iss_device_control_policy_not_applied" historical issues in a scorecard
   *
   * @summary Get "iss_device_control_policy_not_applied" histor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_device_control_policy_not_applied(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceControlPolicyNotAppliedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceControlPolicyNotAppliedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_device_control_policy_not_applied/', 'get', metadata);
  }

  /**
   * Get "iss_device_firewall_policy_not_applied" historical issues in a scorecard
   *
   * @summary Get "iss_device_firewall_policy_not_applied" histo
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_device_firewall_policy_not_applied(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceFirewallPolicyNotAppliedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceFirewallPolicyNotAppliedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_device_firewall_policy_not_applied/', 'get', metadata);
  }

  /**
   * Get "iss_device_prevention_policy_not_applied" historical issues in a scorecard
   *
   * @summary Get "iss_device_prevention_policy_not_applied" his
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_device_prevention_policy_not_applied(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDevicePreventionPolicyNotAppliedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDevicePreventionPolicyNotAppliedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_device_prevention_policy_not_applied/', 'get', metadata);
  }

  /**
   * Get "iss_device_remote_response_policy_not_applied" historical issues in a scorecard
   *
   * @summary Get "iss_device_remote_response_policy_not_applied
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_device_remote_response_policy_not_applied(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceRemoteResponsePolicyNotAppliedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceRemoteResponsePolicyNotAppliedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_device_remote_response_policy_not_applied/', 'get', metadata);
  }

  /**
   * Get "iss_device_sensor_update_policy_not_applied" historical issues in a scorecard
   *
   * @summary Get "iss_device_sensor_update_policy_not_applied" 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_device_sensor_update_policy_not_applied(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceSensorUpdatePolicyNotAppliedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceSensorUpdatePolicyNotAppliedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_device_sensor_update_policy_not_applied/', 'get', metadata);
  }

  /**
   * Get "iss_digital_footprint_hostname" historical issues in a scorecard
   *
   * @summary Get "iss_digital_footprint_hostname" historical is
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_digital_footprint_hostname(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDigitalFootprintHostnameMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDigitalFootprintHostnameResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_digital_footprint_hostname/', 'get', metadata);
  }

  /**
   * Get "iss_digital_footprint_ip" historical issues in a scorecard
   *
   * @summary Get "iss_digital_footprint_ip" historical issues i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_digital_footprint_ip(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDigitalFootprintIpMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDigitalFootprintIpResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_digital_footprint_ip/', 'get', metadata);
  }

  /**
   * Get "iss_endpoint_security_product_detected" historical issues in a scorecard
   *
   * @summary Get "iss_endpoint_security_product_detected" histo
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_endpoint_security_product_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssEndpointSecurityProductDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssEndpointSecurityProductDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_endpoint_security_product_detected/', 'get', metadata);
  }

  /**
   * Get "iss_ephemeral_disks_not_encrypted" historical issues in a scorecard
   *
   * @summary Get "iss_ephemeral_disks_not_encrypted" historical
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_ephemeral_disks_not_encrypted(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssEphemeralDisksNotEncryptedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssEphemeralDisksNotEncryptedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_ephemeral_disks_not_encrypted/', 'get', metadata);
  }

  /**
   * Get "iss_factors_settings_good_ztc_audit_scores" historical issues in a scorecard
   *
   * @summary Get "iss_factors_settings_good_ztc_audit_scores" h
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_factors_settings_good_ztc_audit_scores(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsGoodZtcAuditScoresMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsGoodZtcAuditScoresResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_factors_settings_good_ztc_audit_scores/', 'get', metadata);
  }

  /**
   * Get "iss_factors_settings_low_ztc_audit_scores" historical issues in a scorecard
   *
   * @summary Get "iss_factors_settings_low_ztc_audit_scores" hi
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_factors_settings_low_ztc_audit_scores(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsLowZtcAuditScoresMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsLowZtcAuditScoresResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_factors_settings_low_ztc_audit_scores/', 'get', metadata);
  }

  /**
   * Get "iss_factors_settings_medium_ztc_audit_scores" historical issues in a scorecard
   *
   * @summary Get "iss_factors_settings_medium_ztc_audit_scores"
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_factors_settings_medium_ztc_audit_scores(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsMediumZtcAuditScoresMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsMediumZtcAuditScoresResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_factors_settings_medium_ztc_audit_scores/', 'get', metadata);
  }

  /**
   * Get "iss_factors_settings_very_low_ztc_audit_scores" historical issues in a scorecard
   *
   * @summary Get "iss_factors_settings_very_low_ztc_audit_score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_factors_settings_very_low_ztc_audit_scores(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsVeryLowZtcAuditScoresMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsVeryLowZtcAuditScoresResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_factors_settings_very_low_ztc_audit_scores/', 'get', metadata);
  }

  /**
   * Get "iss_failed_2fa_authentication" historical issues in a scorecard
   *
   * @summary Get "iss_failed_2fa_authentication" historical iss
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_failed_2fa_authentication(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFailed2FaAuthenticationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFailed2FaAuthenticationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_failed_2fa_authentication/', 'get', metadata);
  }

  /**
   * Get "iss_gateway_antivirus_present" historical issues in a scorecard
   *
   * @summary Get "iss_gateway_antivirus_present" historical iss
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_gateway_antivirus_present(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusPresentMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusPresentResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_gateway_antivirus_present/', 'get', metadata);
  }

  /**
   * Get "iss_gateway_antivirus_service_expired" historical issues in a scorecard
   *
   * @summary Get "iss_gateway_antivirus_service_expired" histor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_gateway_antivirus_service_expired(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusServiceExpiredMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusServiceExpiredResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_gateway_antivirus_service_expired/', 'get', metadata);
  }

  /**
   * Get "iss_gateway_antivirus_service_not_valid" historical issues in a scorecard
   *
   * @summary Get "iss_gateway_antivirus_service_not_valid" hist
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_gateway_antivirus_service_not_valid(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusServiceNotValidMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusServiceNotValidResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_gateway_antivirus_service_not_valid/', 'get', metadata);
  }

  /**
   * Get "iss_gateway_antivirus_service_valid" historical issues in a scorecard
   *
   * @summary Get "iss_gateway_antivirus_service_valid" historic
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_gateway_antivirus_service_valid(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusServiceValidMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusServiceValidResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_gateway_antivirus_service_valid/', 'get', metadata);
  }

  /**
   * Get "iss_gateway_antivirus_signatures_out_of_date" historical issues in a scorecard
   *
   * @summary Get "iss_gateway_antivirus_signatures_out_of_date"
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_gateway_antivirus_signatures_out_of_date(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusSignaturesOutOfDateMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusSignaturesOutOfDateResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_gateway_antivirus_signatures_out_of_date/', 'get', metadata);
  }

  /**
   * Get "iss_gateway_antivirus_signatures_updated" historical issues in a scorecard
   *
   * @summary Get "iss_gateway_antivirus_signatures_updated" his
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_gateway_antivirus_signatures_updated(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusSignaturesUpdatedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusSignaturesUpdatedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_gateway_antivirus_signatures_updated/', 'get', metadata);
  }

  /**
   * Get "iss_good_overall_ztc_audit_score" historical issues in a scorecard
   *
   * @summary Get "iss_good_overall_ztc_audit_score" historical 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_good_overall_ztc_audit_score(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGoodOverallZtcAuditScoreMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGoodOverallZtcAuditScoreResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_good_overall_ztc_audit_score/', 'get', metadata);
  }

  /**
   * Get "iss_host_based_firewall_present" historical issues in a scorecard
   *
   * @summary Get "iss_host_based_firewall_present" historical i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_host_based_firewall_present(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssHostBasedFirewallPresentMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssHostBasedFirewallPresentResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_host_based_firewall_present/', 'get', metadata);
  }

  /**
   * Get "iss_host_vulnerable_to_cve_detected" historical issues in a scorecard
   *
   * @summary Get "iss_host_vulnerable_to_cve_detected" historic
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_host_vulnerable_to_cve_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssHostVulnerableToCveDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssHostVulnerableToCveDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_host_vulnerable_to_cve_detected/', 'get', metadata);
  }

  /**
   * Get "iss_http_antivirus_scan_enabled" historical issues in a scorecard
   *
   * @summary Get "iss_http_antivirus_scan_enabled" historical i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_http_antivirus_scan_enabled(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssHttpAntivirusScanEnabledMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssHttpAntivirusScanEnabledResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_http_antivirus_scan_enabled/', 'get', metadata);
  }

  /**
   * Get "iss_incident_closed" historical issues in a scorecard
   *
   * @summary Get "iss_incident_closed" historical issues in a s
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_incident_closed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssIncidentClosedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssIncidentClosedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_incident_closed/', 'get', metadata);
  }

  /**
   * Get "iss_incident_detected" historical issues in a scorecard
   *
   * @summary Get "iss_incident_detected" historical issues in a
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_incident_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssIncidentDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssIncidentDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_incident_detected/', 'get', metadata);
  }

  /**
   * Get "iss_low_average_overall_ztc_audit_score" historical issues in a scorecard
   *
   * @summary Get "iss_low_average_overall_ztc_audit_score" hist
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_low_average_overall_ztc_audit_score(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssLowAverageOverallZtcAuditScoreMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssLowAverageOverallZtcAuditScoreResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_low_average_overall_ztc_audit_score/', 'get', metadata);
  }

  /**
   * Get "iss_medium_overall_ztc_audit_score" historical issues in a scorecard
   *
   * @summary Get "iss_medium_overall_ztc_audit_score" historica
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_medium_overall_ztc_audit_score(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssMediumOverallZtcAuditScoreMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssMediumOverallZtcAuditScoreResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_medium_overall_ztc_audit_score/', 'get', metadata);
  }

  /**
   * Get "iss_object_storage_buckets_allow_public_access" historical issues in a scorecard
   *
   * @summary Get "iss_object_storage_buckets_allow_public_acces
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_object_storage_buckets_allow_public_access(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssObjectStorageBucketsAllowPublicAccessMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssObjectStorageBucketsAllowPublicAccessResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_object_storage_buckets_allow_public_access/', 'get', metadata);
  }

  /**
   * Get "iss_object_storage_buckets_not_encrypted" historical issues in a scorecard
   *
   * @summary Get "iss_object_storage_buckets_not_encrypted" his
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_object_storage_buckets_not_encrypted(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssObjectStorageBucketsNotEncryptedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssObjectStorageBucketsNotEncryptedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_object_storage_buckets_not_encrypted/', 'get', metadata);
  }

  /**
   * Get "iss_os_settings_not_meet_zero_trust_requirements" historical issues in a scorecard
   *
   * @summary Get "iss_os_settings_not_meet_zero_trust_requireme
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_os_settings_not_meet_zero_trust_requirements(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOsSettingsNotMeetZeroTrustRequirementsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOsSettingsNotMeetZeroTrustRequirementsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_os_settings_not_meet_zero_trust_requirements/', 'get', metadata);
  }

  /**
   * Get "iss_out_of_date_endpoint_security" historical issues in a scorecard
   *
   * @summary Get "iss_out_of_date_endpoint_security" historical
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_out_of_date_endpoint_security(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOutOfDateEndpointSecurityMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOutOfDateEndpointSecurityResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_out_of_date_endpoint_security/', 'get', metadata);
  }

  /**
   * Get "iss_out_of_date_firmware" historical issues in a scorecard
   *
   * @summary Get "iss_out_of_date_firmware" historical issues i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_out_of_date_firmware(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOutOfDateFirmwareMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOutOfDateFirmwareResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_out_of_date_firmware/', 'get', metadata);
  }

  /**
   * Get "iss_out_of_date_operating_system" historical issues in a scorecard
   *
   * @summary Get "iss_out_of_date_operating_system" historical 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_out_of_date_operating_system(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOutOfDateOperatingSystemMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOutOfDateOperatingSystemResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_out_of_date_operating_system/', 'get', metadata);
  }

  /**
   * Get "iss_password_policy_allows_reuse" historical issues in a scorecard
   *
   * @summary Get "iss_password_policy_allows_reuse" historical 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_password_policy_allows_reuse(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssPasswordPolicyAllowsReuseMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssPasswordPolicyAllowsReuseResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_password_policy_allows_reuse/', 'get', metadata);
  }

  /**
   * Get "iss_password_policy_no_regular_updates" historical issues in a scorecard
   *
   * @summary Get "iss_password_policy_no_regular_updates" histo
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_password_policy_no_regular_updates(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssPasswordPolicyNoRegularUpdatesMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssPasswordPolicyNoRegularUpdatesResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_password_policy_no_regular_updates/', 'get', metadata);
  }

  /**
   * Get "iss_persistent_disks_not_encrypted" historical issues in a scorecard
   *
   * @summary Get "iss_persistent_disks_not_encrypted" historica
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_persistent_disks_not_encrypted(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssPersistentDisksNotEncryptedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssPersistentDisksNotEncryptedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_persistent_disks_not_encrypted/', 'get', metadata);
  }

  /**
   * Get "iss_queues_encrypted_with_provider_managed_key" historical issues in a scorecard
   *
   * @summary Get "iss_queues_encrypted_with_provider_managed_ke
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_queues_encrypted_with_provider_managed_key(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssQueuesEncryptedWithProviderManagedKeyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssQueuesEncryptedWithProviderManagedKeyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_queues_encrypted_with_provider_managed_key/', 'get', metadata);
  }

  /**
   * Get "iss_queues_not_encrypted" historical issues in a scorecard
   *
   * @summary Get "iss_queues_not_encrypted" historical issues i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_queues_not_encrypted(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssQueuesNotEncryptedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssQueuesNotEncryptedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_queues_not_encrypted/', 'get', metadata);
  }

  /**
   * Get "iss_root_account_has_access_keys" historical issues in a scorecard
   *
   * @summary Get "iss_root_account_has_access_keys" historical 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_root_account_has_access_keys(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssRootAccountHasAccessKeysMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssRootAccountHasAccessKeysResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_root_account_has_access_keys/', 'get', metadata);
  }

  /**
   * Get "iss_root_account_without_mfa_enabled" historical issues in a scorecard
   *
   * @summary Get "iss_root_account_without_mfa_enabled" histori
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_root_account_without_mfa_enabled(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssRootAccountWithoutMfaEnabledMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssRootAccountWithoutMfaEnabledResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_root_account_without_mfa_enabled/', 'get', metadata);
  }

  /**
   * Get "iss_sensor_policies_not_meet_zero_trust_requirements" historical issues in a
   * scorecard
   *
   * @summary Get "iss_sensor_policies_not_meet_zero_trust_requi
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_sensor_policies_not_meet_zero_trust_requirements(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssSensorPoliciesNotMeetZeroTrustRequirementsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssSensorPoliciesNotMeetZeroTrustRequirementsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_sensor_policies_not_meet_zero_trust_requirements/', 'get', metadata);
  }

  /**
   * Get "iss_strong_minimum_password_length_set" historical issues in a scorecard
   *
   * @summary Get "iss_strong_minimum_password_length_set" histo
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_strong_minimum_password_length_set(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssStrongMinimumPasswordLengthSetMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssStrongMinimumPasswordLengthSetResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_strong_minimum_password_length_set/', 'get', metadata);
  }

  /**
   * Get "iss_threat_detected" historical issues in a scorecard
   *
   * @summary Get "iss_threat_detected" historical issues in a s
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_threat_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssThreatDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssThreatDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_threat_detected/', 'get', metadata);
  }

  /**
   * Get "iss_threat_remediated" historical issues in a scorecard
   *
   * @summary Get "iss_threat_remediated" historical issues in a
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_threat_remediated(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssThreatRemediatedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssThreatRemediatedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_threat_remediated/', 'get', metadata);
  }

  /**
   * Get "iss_users_with_access_keys_not_rotated_regularly" historical issues in a scorecard
   *
   * @summary Get "iss_users_with_access_keys_not_rotated_regula
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_users_with_access_keys_not_rotated_regularly(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithAccessKeysNotRotatedRegularlyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithAccessKeysNotRotatedRegularlyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_users_with_access_keys_not_rotated_regularly/', 'get', metadata);
  }

  /**
   * Get "iss_users_with_passwords_not_rotated_regularly" historical issues in a scorecard
   *
   * @summary Get "iss_users_with_passwords_not_rotated_regularl
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_users_with_passwords_not_rotated_regularly(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithPasswordsNotRotatedRegularlyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithPasswordsNotRotatedRegularlyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_users_with_passwords_not_rotated_regularly/', 'get', metadata);
  }

  /**
   * Get "iss_users_with_unused_access_keys" historical issues in a scorecard
   *
   * @summary Get "iss_users_with_unused_access_keys" historical
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_users_with_unused_access_keys(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithUnusedAccessKeysMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithUnusedAccessKeysResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_users_with_unused_access_keys/', 'get', metadata);
  }

  /**
   * Get "iss_users_with_unused_passwords" historical issues in a scorecard
   *
   * @summary Get "iss_users_with_unused_passwords" historical i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_users_with_unused_passwords(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithUnusedPasswordsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithUnusedPasswordsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_users_with_unused_passwords/', 'get', metadata);
  }

  /**
   * Get "iss_very_low_overall_ztc_audit_score" historical issues in a scorecard
   *
   * @summary Get "iss_very_low_overall_ztc_audit_score" histori
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesIss_very_low_overall_ztc_audit_score(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssVeryLowOverallZtcAuditScoreMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssVeryLowOverallZtcAuditScoreResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/iss_very_low_overall_ztc_audit_score/', 'get', metadata);
  }

  /**
   * Get "java_debugger" historical issues in a scorecard
   *
   * @summary Get "java_debugger" historical issues in a scoreca
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesJava_debugger(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesJavaDebuggerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesJavaDebuggerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/java_debugger/', 'get', metadata);
  }

  /**
   * Get "known_compromised_or_hostile_host" historical issues in a scorecard
   *
   * @summary Get "known_compromised_or_hostile_host" historical
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesKnown_compromised_or_hostile_host(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesKnownCompromisedOrHostileHostMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesKnownCompromisedOrHostileHostResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/known_compromised_or_hostile_host/', 'get', metadata);
  }

  /**
   * Get "language_exposed" historical issues in a scorecard
   *
   * @summary Get "language_exposed" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesLanguage_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLanguageExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLanguageExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/language_exposed/', 'get', metadata);
  }

  /**
   * Get "leaked_credentials" historical issues in a scorecard
   *
   * @summary Get "leaked_credentials" historical issues in a sc
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesLeaked_credentials(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLeakedCredentialsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLeakedCredentialsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/leaked_credentials/', 'get', metadata);
  }

  /**
   * Get "leaked_credentials_info" historical issues in a scorecard
   *
   * @summary Get "leaked_credentials_info" historical issues in
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesLeaked_credentials_info(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLeakedCredentialsInfoMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLeakedCredentialsInfoResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/leaked_credentials_info/', 'get', metadata);
  }

  /**
   * Get "links_to_insecure_website" historical issues in a scorecard
   *
   * @summary Get "links_to_insecure_website" historical issues 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesLinks_to_insecure_website(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLinksToInsecureWebsiteMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLinksToInsecureWebsiteResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/links_to_insecure_website/', 'get', metadata);
  }

  /**
   * Get "local_file_path_exposed_via_url_scheme" historical issues in a scorecard
   *
   * @summary Get "local_file_path_exposed_via_url_scheme" histo
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesLocal_file_path_exposed_via_url_scheme(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLocalFilePathExposedViaUrlSchemeMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLocalFilePathExposedViaUrlSchemeResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/local_file_path_exposed_via_url_scheme/', 'get', metadata);
  }

  /**
   * Get "mail_server_unusual_port" historical issues in a scorecard
   *
   * @summary Get "mail_server_unusual_port" historical issues i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMail_server_unusual_port(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMailServerUnusualPortMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMailServerUnusualPortResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/mail_server_unusual_port/', 'get', metadata);
  }

  /**
   * Get "malicious_botnet_c_and_c_server_detected" historical issues in a scorecard
   *
   * @summary Get "malicious_botnet_c_and_c_server_detected" his
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMalicious_botnet_c_and_c_server_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousBotnetCAndCServerDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousBotnetCAndCServerDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/malicious_botnet_c_and_c_server_detected/', 'get', metadata);
  }

  /**
   * Get "malicious_scan_detected" historical issues in a scorecard
   *
   * @summary Get "malicious_scan_detected" historical issues in
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMalicious_scan_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousScanDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousScanDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/malicious_scan_detected/', 'get', metadata);
  }

  /**
   * Get "malicious_tor_exit_node_detected" historical issues in a scorecard
   *
   * @summary Get "malicious_tor_exit_node_detected" historical 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMalicious_tor_exit_node_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousTorExitNodeDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousTorExitNodeDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/malicious_tor_exit_node_detected/', 'get', metadata);
  }

  /**
   * Get "malicious_tor_relay_router_node_detected" historical issues in a scorecard
   *
   * @summary Get "malicious_tor_relay_router_node_detected" his
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMalicious_tor_relay_router_node_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousTorRelayRouterNodeDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousTorRelayRouterNodeDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/malicious_tor_relay_router_node_detected/', 'get', metadata);
  }

  /**
   * Get "malicious_user_agent_detected" historical issues in a scorecard
   *
   * @summary Get "malicious_user_agent_detected" historical iss
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMalicious_user_agent_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousUserAgentDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousUserAgentDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/malicious_user_agent_detected/', 'get', metadata);
  }

  /**
   * Get "malware_controller" historical issues in a scorecard
   *
   * @summary Get "malware_controller" historical issues in a sc
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMalware_controller(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareControllerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareControllerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/malware_controller/', 'get', metadata);
  }

  /**
   * Get "malware_detected" historical issues in a scorecard
   *
   * @summary Get "malware_detected" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMalware_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/malware_detected/', 'get', metadata);
  }

  /**
   * Get "malware_infection" historical issues in a scorecard
   *
   * @summary Get "malware_infection" historical issues in a sco
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMalware_infection(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareInfectionMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareInfectionResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/malware_infection/', 'get', metadata);
  }

  /**
   * Get "malware_infection_trail" historical issues in a scorecard
   *
   * @summary Get "malware_infection_trail" historical issues in
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMalware_infection_trail(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareInfectionTrailMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareInfectionTrailResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/malware_infection_trail/', 'get', metadata);
  }

  /**
   * Get "microsoft_exchange_0_day_vulnerability" historical issues in a scorecard
   *
   * @summary Get "microsoft_exchange_0_day_vulnerability" histo
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMicrosoft_exchange_0_day_vulnerability(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMicrosoftExchange0DayVulnerabilityMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMicrosoftExchange0DayVulnerabilityResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/microsoft_exchange_0_day_vulnerability/', 'get', metadata);
  }

  /**
   * Get "microsoft_exchange_http_api_vulnerability" historical issues in a scorecard
   *
   * @summary Get "microsoft_exchange_http_api_vulnerability" hi
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMicrosoft_exchange_http_api_vulnerability(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMicrosoftExchangeHttpApiVulnerabilityMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMicrosoftExchangeHttpApiVulnerabilityResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/microsoft_exchange_http_api_vulnerability/', 'get', metadata);
  }

  /**
   * Get "minecraft_server" historical issues in a scorecard
   *
   * @summary Get "minecraft_server" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMinecraft_server(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMinecraftServerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMinecraftServerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/minecraft_server/', 'get', metadata);
  }

  /**
   * Get "mirai_botnet_traffic_detected" historical issues in a scorecard
   *
   * @summary Get "mirai_botnet_traffic_detected" historical iss
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMirai_botnet_traffic_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMiraiBotnetTrafficDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMiraiBotnetTrafficDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/mirai_botnet_traffic_detected/', 'get', metadata);
  }

  /**
   * Get "mysql_server_empty_password" historical issues in a scorecard
   *
   * @summary Get "mysql_server_empty_password" historical issue
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesMysql_server_empty_password(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMysqlServerEmptyPasswordMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMysqlServerEmptyPasswordResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/mysql_server_empty_password/', 'get', metadata);
  }

  /**
   * Get "name_exposed" historical issues in a scorecard
   *
   * @summary Get "name_exposed" historical issues in a scorecar
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesName_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesNameExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesNameExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/name_exposed/', 'get', metadata);
  }

  /**
   * Get "non_social_media_access_token_exposed" historical issues in a scorecard
   *
   * @summary Get "non_social_media_access_token_exposed" histor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesNon_social_media_access_token_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesNonSocialMediaAccessTokenExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesNonSocialMediaAccessTokenExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/non_social_media_access_token_exposed/', 'get', metadata);
  }

  /**
   * Get "occupation_exposed" historical issues in a scorecard
   *
   * @summary Get "occupation_exposed" historical issues in a sc
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesOccupation_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOccupationExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOccupationExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/occupation_exposed/', 'get', metadata);
  }

  /**
   * Get "open_port" historical issues in a scorecard
   *
   * @summary Get "open_port" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesOpen_port(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOpenPortMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOpenPortResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/open_port/', 'get', metadata);
  }

  /**
   * Get "openssl_critical_vulnerability" historical issues in a scorecard
   *
   * @summary Get "openssl_critical_vulnerability" historical is
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesOpenssl_critical_vulnerability(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOpensslCriticalVulnerabilityMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOpensslCriticalVulnerabilityResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/openssl_critical_vulnerability/', 'get', metadata);
  }

  /**
   * Get "outdated_browser" historical issues in a scorecard
   *
   * @summary Get "outdated_browser" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesOutdated_browser(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedBrowserMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedBrowserResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/outdated_browser/', 'get', metadata);
  }

  /**
   * Get "outdated_browser_domain" historical issues in a scorecard
   *
   * @summary Get "outdated_browser_domain" historical issues in
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesOutdated_browser_domain(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedBrowserDomainMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedBrowserDomainResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/outdated_browser_domain/', 'get', metadata);
  }

  /**
   * Get "outdated_os" historical issues in a scorecard
   *
   * @summary Get "outdated_os" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesOutdated_os(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedOsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedOsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/outdated_os/', 'get', metadata);
  }

  /**
   * Get "outdated_os_domain" historical issues in a scorecard
   *
   * @summary Get "outdated_os_domain" historical issues in a sc
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesOutdated_os_domain(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedOsDomainMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedOsDomainResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/outdated_os_domain/', 'get', metadata);
  }

  /**
   * Get "parents_name_exposed" historical issues in a scorecard
   *
   * @summary Get "parents_name_exposed" historical issues in a 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesParents_name_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesParentsNameExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesParentsNameExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/parents_name_exposed/', 'get', metadata);
  }

  /**
   * Get "password_exposed" historical issues in a scorecard
   *
   * @summary Get "password_exposed" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPassword_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPasswordExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPasswordExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/password_exposed/', 'get', metadata);
  }

  /**
   * Get "password_hint_exposed" historical issues in a scorecard
   *
   * @summary Get "password_hint_exposed" historical issues in a
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPassword_hint_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPasswordHintExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPasswordHintExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/password_hint_exposed/', 'get', metadata);
  }

  /**
   * Get "patching_analysis_high" historical issues in a scorecard
   *
   * @summary Get "patching_analysis_high" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPatching_analysis_high(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingAnalysisHighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingAnalysisHighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/patching_analysis_high/', 'get', metadata);
  }

  /**
   * Get "patching_analysis_low" historical issues in a scorecard
   *
   * @summary Get "patching_analysis_low" historical issues in a
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPatching_analysis_low(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingAnalysisLowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingAnalysisLowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/patching_analysis_low/', 'get', metadata);
  }

  /**
   * Get "patching_analysis_medium" historical issues in a scorecard
   *
   * @summary Get "patching_analysis_medium" historical issues i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPatching_analysis_medium(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingAnalysisMediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingAnalysisMediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/patching_analysis_medium/', 'get', metadata);
  }

  /**
   * Get "patching_cadence_critical" historical issues in a scorecard
   *
   * @summary Get "patching_cadence_critical" historical issues 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPatching_cadence_critical(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceCriticalMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceCriticalResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/patching_cadence_critical/', 'get', metadata);
  }

  /**
   * Get "patching_cadence_high" historical issues in a scorecard
   *
   * @summary Get "patching_cadence_high" historical issues in a
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPatching_cadence_high(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceHighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceHighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/patching_cadence_high/', 'get', metadata);
  }

  /**
   * Get "patching_cadence_info" historical issues in a scorecard
   *
   * @summary Get "patching_cadence_info" historical issues in a
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPatching_cadence_info(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceInfoMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceInfoResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/patching_cadence_info/', 'get', metadata);
  }

  /**
   * Get "patching_cadence_low" historical issues in a scorecard
   *
   * @summary Get "patching_cadence_low" historical issues in a 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPatching_cadence_low(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceLowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceLowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/patching_cadence_low/', 'get', metadata);
  }

  /**
   * Get "patching_cadence_medium" historical issues in a scorecard
   *
   * @summary Get "patching_cadence_medium" historical issues in
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPatching_cadence_medium(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceMediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceMediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/patching_cadence_medium/', 'get', metadata);
  }

  /**
   * Get "patching_cadence_v3_critical" historical issues in a scorecard
   *
   * @summary Get "patching_cadence_v3_critical" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPatching_cadence_v3_critical(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3CriticalMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3CriticalResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/patching_cadence_v3_critical/', 'get', metadata);
  }

  /**
   * Get "patching_cadence_v3_high" historical issues in a scorecard
   *
   * @summary Get "patching_cadence_v3_high" historical issues i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPatching_cadence_v3_high(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3HighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3HighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/patching_cadence_v3_high/', 'get', metadata);
  }

  /**
   * Get "patching_cadence_v3_low" historical issues in a scorecard
   *
   * @summary Get "patching_cadence_v3_low" historical issues in
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPatching_cadence_v3_low(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3LowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3LowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/patching_cadence_v3_low/', 'get', metadata);
  }

  /**
   * Get "patching_cadence_v3_medium" historical issues in a scorecard
   *
   * @summary Get "patching_cadence_v3_medium" historical issues
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPatching_cadence_v3_medium(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3MediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3MediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/patching_cadence_v3_medium/', 'get', metadata);
  }

  /**
   * Get "payment_provider" historical issues in a scorecard
   *
   * @summary Get "payment_provider" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPayment_provider(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPaymentProviderMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPaymentProviderResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/payment_provider/', 'get', metadata);
  }

  /**
   * Get "phishing" historical issues in a scorecard
   *
   * @summary Get "phishing" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPhishing(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPhishingMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPhishingResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/phishing/', 'get', metadata);
  }

  /**
   * Get "phone_number_exposed" historical issues in a scorecard
   *
   * @summary Get "phone_number_exposed" historical issues in a 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPhone_number_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPhoneNumberExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPhoneNumberExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/phone_number_exposed/', 'get', metadata);
  }

  /**
   * Get "physical_address_exposed" historical issues in a scorecard
   *
   * @summary Get "physical_address_exposed" historical issues i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPhysical_address_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPhysicalAddressExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPhysicalAddressExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/physical_address_exposed/', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable" historical issues in a scorecard
   *
   * @summary Get "potentially_vulnerable" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPotentially_vulnerable(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/potentially_vulnerable/', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cisco_rv_320_325" historical issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cisco_rv_320_325" hist
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPotentially_vulnerable_cisco_rv_320_325(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCiscoRv320325MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCiscoRv320325Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/potentially_vulnerable_cisco_rv_320_325/', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_33246" historical issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_33246" histor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPotentially_vulnerable_cve_2023_33246(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202333246MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202333246Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/potentially_vulnerable_cve_2023_33246/', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_34362" historical issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_34362" histor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPotentially_vulnerable_cve_2023_34362(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202334362MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202334362Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/potentially_vulnerable_cve_2023_34362/', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_3519" historical issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_3519" histori
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPotentially_vulnerable_cve_2023_3519(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve20233519MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve20233519Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/potentially_vulnerable_cve_2023_3519/', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_37582" historical issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_37582" histor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPotentially_vulnerable_cve_2023_37582(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202337582MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202337582Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/potentially_vulnerable_cve_2023_37582/', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_37979" historical issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_37979" histor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPotentially_vulnerable_cve_2023_37979(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202337979MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202337979Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/potentially_vulnerable_cve_2023_37979/', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_38035" historical issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_38035" histor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPotentially_vulnerable_cve_2023_38035(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202338035MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202338035Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/potentially_vulnerable_cve_2023_38035/', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2023_46747" historical issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2023_46747" histor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPotentially_vulnerable_cve_2023_46747(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202346747MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202346747Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/potentially_vulnerable_cve_2023_46747/', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2024_21887" historical issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2024_21887" histor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPotentially_vulnerable_cve_2024_21887(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202421887MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202421887Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/potentially_vulnerable_cve_2024_21887/', 'get', metadata);
  }

  /**
   * Get "potentially_vulnerable_cve_2024_46805" historical issues in a scorecard
   *
   * @summary Get "potentially_vulnerable_cve_2024_46805" histor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPotentially_vulnerable_cve_2024_46805(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202446805MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202446805Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/potentially_vulnerable_cve_2024_46805/', 'get', metadata);
  }

  /**
   * Get "product_exploited_by_ransomware_actors" historical issues in a scorecard
   *
   * @summary Get "product_exploited_by_ransomware_actors" histo
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesProduct_exploited_by_ransomware_actors(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesProductExploitedByRansomwareActorsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesProductExploitedByRansomwareActorsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/product_exploited_by_ransomware_actors/', 'get', metadata);
  }

  /**
   * Get "product_uses_vulnerable_log4j" historical issues in a scorecard
   *
   * @summary Get "product_uses_vulnerable_log4j" historical iss
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesProduct_uses_vulnerable_log4j(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesProductUsesVulnerableLog4JMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesProductUsesVulnerableLog4JResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/product_uses_vulnerable_log4j/', 'get', metadata);
  }

  /**
   * Get "pva_installation" historical issues in a scorecard
   *
   * @summary Get "pva_installation" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPva_installation(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPvaInstallationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPvaInstallationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/pva_installation/', 'get', metadata);
  }

  /**
   * Get "pva_installation_trail" historical issues in a scorecard
   *
   * @summary Get "pva_installation_trail" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesPva_installation_trail(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPvaInstallationTrailMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPvaInstallationTrailResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/pva_installation_trail/', 'get', metadata);
  }

  /**
   * Get "race_exposed" historical issues in a scorecard
   *
   * @summary Get "race_exposed" historical issues in a scorecar
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesRace_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRaceExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRaceExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/race_exposed/', 'get', metadata);
  }

  /**
   * Get "ransomware_association" historical issues in a scorecard
   *
   * @summary Get "ransomware_association" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesRansomware_association(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareAssociationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareAssociationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/ransomware_association/', 'get', metadata);
  }

  /**
   * Get "ransomware_infection" historical issues in a scorecard
   *
   * @summary Get "ransomware_infection" historical issues in a 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesRansomware_infection(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareInfectionMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareInfectionResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/ransomware_infection/', 'get', metadata);
  }

  /**
   * Get "ransomware_infection_trail" historical issues in a scorecard
   *
   * @summary Get "ransomware_infection_trail" historical issues
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesRansomware_infection_trail(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareInfectionTrailMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareInfectionTrailResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/ransomware_infection_trail/', 'get', metadata);
  }

  /**
   * Get "ransomware_victim" historical issues in a scorecard
   *
   * @summary Get "ransomware_victim" historical issues in a sco
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesRansomware_victim(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareVictimMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareVictimResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/ransomware_victim/', 'get', metadata);
  }

  /**
   * Get "redirect_chain_contains_http_v2" historical issues in a scorecard
   *
   * @summary Get "redirect_chain_contains_http_v2" historical i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesRedirect_chain_contains_http_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRedirectChainContainsHttpV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRedirectChainContainsHttpV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/redirect_chain_contains_http_v2/', 'get', metadata);
  }

  /**
   * Get "redirect_to_insecure_website" historical issues in a scorecard
   *
   * @summary Get "redirect_to_insecure_website" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesRedirect_to_insecure_website(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRedirectToInsecureWebsiteMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRedirectToInsecureWebsiteResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/redirect_to_insecure_website/', 'get', metadata);
  }

  /**
   * Get "references_object_storage_v2" historical issues in a scorecard
   *
   * @summary Get "references_object_storage_v2" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesReferences_object_storage_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesReferencesObjectStorageV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesReferencesObjectStorageV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/references_object_storage_v2/', 'get', metadata);
  }

  /**
   * Get "remote_access" historical issues in a scorecard
   *
   * @summary Get "remote_access" historical issues in a scoreca
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesRemote_access(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRemoteAccessMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRemoteAccessResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/remote_access/', 'get', metadata);
  }

  /**
   * Get "security_question_and_answer_exposed" historical issues in a scorecard
   *
   * @summary Get "security_question_and_answer_exposed" histori
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSecurity_question_and_answer_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSecurityQuestionAndAnswerExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSecurityQuestionAndAnswerExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/security_question_and_answer_exposed/', 'get', metadata);
  }

  /**
   * Get "sensitive_data_exposure_through_insecure_channel" historical issues in a scorecard
   *
   * @summary Get "sensitive_data_exposure_through_insecure_chan
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSensitive_data_exposure_through_insecure_channel(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSensitiveDataExposureThroughInsecureChannelMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSensitiveDataExposureThroughInsecureChannelResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/sensitive_data_exposure_through_insecure_channel/', 'get', metadata);
  }

  /**
   * Get "server_error" historical issues in a scorecard
   *
   * @summary Get "server_error" historical issues in a scorecar
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesServer_error(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServerErrorMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServerErrorResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/server_error/', 'get', metadata);
  }

  /**
   * Get "service_cassandra" historical issues in a scorecard
   *
   * @summary Get "service_cassandra" historical issues in a sco
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_cassandra(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceCassandraMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceCassandraResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_cassandra/', 'get', metadata);
  }

  /**
   * Get "service_cloud_provider" historical issues in a scorecard
   *
   * @summary Get "service_cloud_provider" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_cloud_provider(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceCloudProviderMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceCloudProviderResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_cloud_provider/', 'get', metadata);
  }

  /**
   * Get "service_couchdb" historical issues in a scorecard
   *
   * @summary Get "service_couchdb" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_couchdb(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceCouchdbMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceCouchdbResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_couchdb/', 'get', metadata);
  }

  /**
   * Get "service_dns" historical issues in a scorecard
   *
   * @summary Get "service_dns" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_dns(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceDnsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceDnsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_dns/', 'get', metadata);
  }

  /**
   * Get "service_elasticsearch" historical issues in a scorecard
   *
   * @summary Get "service_elasticsearch" historical issues in a
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_elasticsearch(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceElasticsearchMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceElasticsearchResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_elasticsearch/', 'get', metadata);
  }

  /**
   * Get "service_end_of_life" historical issues in a scorecard
   *
   * @summary Get "service_end_of_life" historical issues in a s
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_end_of_life(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceEndOfLifeMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceEndOfLifeResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_end_of_life/', 'get', metadata);
  }

  /**
   * Get "service_end_of_service" historical issues in a scorecard
   *
   * @summary Get "service_end_of_service" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_end_of_service(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceEndOfServiceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceEndOfServiceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_end_of_service/', 'get', metadata);
  }

  /**
   * Get "service_ftp" historical issues in a scorecard
   *
   * @summary Get "service_ftp" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_ftp(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceFtpMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceFtpResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_ftp/', 'get', metadata);
  }

  /**
   * Get "service_http_proxy" historical issues in a scorecard
   *
   * @summary Get "service_http_proxy" historical issues in a sc
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_http_proxy(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceHttpProxyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceHttpProxyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_http_proxy/', 'get', metadata);
  }

  /**
   * Get "service_imap" historical issues in a scorecard
   *
   * @summary Get "service_imap" historical issues in a scorecar
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_imap(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceImapMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceImapResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_imap/', 'get', metadata);
  }

  /**
   * Get "service_ldap" historical issues in a scorecard
   *
   * @summary Get "service_ldap" historical issues in a scorecar
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_ldap(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceLdapMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceLdapResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_ldap/', 'get', metadata);
  }

  /**
   * Get "service_ldap_anonymous" historical issues in a scorecard
   *
   * @summary Get "service_ldap_anonymous" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_ldap_anonymous(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceLdapAnonymousMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceLdapAnonymousResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_ldap_anonymous/', 'get', metadata);
  }

  /**
   * Get "service_microsoft_sql" historical issues in a scorecard
   *
   * @summary Get "service_microsoft_sql" historical issues in a
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_microsoft_sql(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceMicrosoftSqlMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceMicrosoftSqlResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_microsoft_sql/', 'get', metadata);
  }

  /**
   * Get "service_mongodb" historical issues in a scorecard
   *
   * @summary Get "service_mongodb" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_mongodb(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceMongodbMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceMongodbResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_mongodb/', 'get', metadata);
  }

  /**
   * Get "service_mysql" historical issues in a scorecard
   *
   * @summary Get "service_mysql" historical issues in a scoreca
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_mysql(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceMysqlMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceMysqlResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_mysql/', 'get', metadata);
  }

  /**
   * Get "service_neo4j" historical issues in a scorecard
   *
   * @summary Get "service_neo4j" historical issues in a scoreca
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_neo4j(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceNeo4JMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceNeo4JResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_neo4j/', 'get', metadata);
  }

  /**
   * Get "service_netbus_remote_access" historical issues in a scorecard
   *
   * @summary Get "service_netbus_remote_access" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_netbus_remote_access(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceNetbusRemoteAccessMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceNetbusRemoteAccessResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_netbus_remote_access/', 'get', metadata);
  }

  /**
   * Get "service_networking" historical issues in a scorecard
   *
   * @summary Get "service_networking" historical issues in a sc
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_networking(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceNetworkingMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceNetworkingResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_networking/', 'get', metadata);
  }

  /**
   * Get "service_open_vpn" historical issues in a scorecard
   *
   * @summary Get "service_open_vpn" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_open_vpn(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceOpenVpnMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceOpenVpnResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_open_vpn/', 'get', metadata);
  }

  /**
   * Get "service_oracle_db" historical issues in a scorecard
   *
   * @summary Get "service_oracle_db" historical issues in a sco
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_oracle_db(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceOracleDbMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceOracleDbResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_oracle_db/', 'get', metadata);
  }

  /**
   * Get "service_oracle_registry" historical issues in a scorecard
   *
   * @summary Get "service_oracle_registry" historical issues in
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_oracle_registry(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceOracleRegistryMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceOracleRegistryResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_oracle_registry/', 'get', metadata);
  }

  /**
   * Get "service_pop3" historical issues in a scorecard
   *
   * @summary Get "service_pop3" historical issues in a scorecar
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_pop3(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePop3MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePop3Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_pop3/', 'get', metadata);
  }

  /**
   * Get "service_postgresql" historical issues in a scorecard
   *
   * @summary Get "service_postgresql" historical issues in a sc
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_postgresql(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePostgresqlMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePostgresqlResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_postgresql/', 'get', metadata);
  }

  /**
   * Get "service_pptp" historical issues in a scorecard
   *
   * @summary Get "service_pptp" historical issues in a scorecar
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_pptp(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePptpMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePptpResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_pptp/', 'get', metadata);
  }

  /**
   * Get "service_pulse_vpn" historical issues in a scorecard
   *
   * @summary Get "service_pulse_vpn" historical issues in a sco
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_pulse_vpn(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePulseVpnMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePulseVpnResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_pulse_vpn/', 'get', metadata);
  }

  /**
   * Get "service_rdp" historical issues in a scorecard
   *
   * @summary Get "service_rdp" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_rdp(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceRdpMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceRdpResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_rdp/', 'get', metadata);
  }

  /**
   * Get "service_redis" historical issues in a scorecard
   *
   * @summary Get "service_redis" historical issues in a scoreca
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_redis(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceRedisMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceRedisResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_redis/', 'get', metadata);
  }

  /**
   * Get "service_rsync" historical issues in a scorecard
   *
   * @summary Get "service_rsync" historical issues in a scoreca
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_rsync(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceRsyncMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceRsyncResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_rsync/', 'get', metadata);
  }

  /**
   * Get "service_smb" historical issues in a scorecard
   *
   * @summary Get "service_smb" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_smb(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceSmbMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceSmbResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_smb/', 'get', metadata);
  }

  /**
   * Get "service_soap" historical issues in a scorecard
   *
   * @summary Get "service_soap" historical issues in a scorecar
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_soap(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceSoapMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceSoapResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_soap/', 'get', metadata);
  }

  /**
   * Get "service_socks_proxy" historical issues in a scorecard
   *
   * @summary Get "service_socks_proxy" historical issues in a s
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_socks_proxy(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceSocksProxyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceSocksProxyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_socks_proxy/', 'get', metadata);
  }

  /**
   * Get "service_telnet" historical issues in a scorecard
   *
   * @summary Get "service_telnet" historical issues in a scorec
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_telnet(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceTelnetMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceTelnetResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_telnet/', 'get', metadata);
  }

  /**
   * Get "service_vnc" historical issues in a scorecard
   *
   * @summary Get "service_vnc" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_vnc(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVncMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVncResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_vnc/', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_critical" historical issues in a scorecard
   *
   * @summary Get "service_vuln_host_critical" historical issues
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_vuln_host_critical(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostCriticalMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostCriticalResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_vuln_host_critical/', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_high" historical issues in a scorecard
   *
   * @summary Get "service_vuln_host_high" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_vuln_host_high(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostHighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostHighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_vuln_host_high/', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_info" historical issues in a scorecard
   *
   * @summary Get "service_vuln_host_info" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_vuln_host_info(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostInfoMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostInfoResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_vuln_host_info/', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_low" historical issues in a scorecard
   *
   * @summary Get "service_vuln_host_low" historical issues in a
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_vuln_host_low(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostLowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostLowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_vuln_host_low/', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_medium" historical issues in a scorecard
   *
   * @summary Get "service_vuln_host_medium" historical issues i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_vuln_host_medium(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostMediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostMediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_vuln_host_medium/', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_v3_critical" historical issues in a scorecard
   *
   * @summary Get "service_vuln_host_v3_critical" historical iss
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_vuln_host_v3_critical(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3CriticalMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3CriticalResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_vuln_host_v3_critical/', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_v3_high" historical issues in a scorecard
   *
   * @summary Get "service_vuln_host_v3_high" historical issues 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_vuln_host_v3_high(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3HighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3HighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_vuln_host_v3_high/', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_v3_low" historical issues in a scorecard
   *
   * @summary Get "service_vuln_host_v3_low" historical issues i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_vuln_host_v3_low(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3LowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3LowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_vuln_host_v3_low/', 'get', metadata);
  }

  /**
   * Get "service_vuln_host_v3_medium" historical issues in a scorecard
   *
   * @summary Get "service_vuln_host_v3_medium" historical issue
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesService_vuln_host_v3_medium(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3MediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3MediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/service_vuln_host_v3_medium/', 'get', metadata);
  }

  /**
   * Get "site_emits_browser_log" historical issues in a scorecard
   *
   * @summary Get "site_emits_browser_log" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSite_emits_browser_log(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSiteEmitsBrowserLogMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSiteEmitsBrowserLogResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/site_emits_browser_log/', 'get', metadata);
  }

  /**
   * Get "site_requests_data_over_insecure_channel" historical issues in a scorecard
   *
   * @summary Get "site_requests_data_over_insecure_channel" his
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSite_requests_data_over_insecure_channel(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSiteRequestsDataOverInsecureChannelMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSiteRequestsDataOverInsecureChannelResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/site_requests_data_over_insecure_channel/', 'get', metadata);
  }

  /**
   * Get "site_uses_hsts_preloading_v2" historical issues in a scorecard
   *
   * @summary Get "site_uses_hsts_preloading_v2" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSite_uses_hsts_preloading_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSiteUsesHstsPreloadingV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSiteUsesHstsPreloadingV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/site_uses_hsts_preloading_v2/', 'get', metadata);
  }

  /**
   * Get "social_media_account_exposed" historical issues in a scorecard
   *
   * @summary Get "social_media_account_exposed" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSocial_media_account_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSocialMediaAccountExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSocialMediaAccountExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/social_media_account_exposed/', 'get', metadata);
  }

  /**
   * Get "social_media_token_exposed" historical issues in a scorecard
   *
   * @summary Get "social_media_token_exposed" historical issues
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSocial_media_token_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSocialMediaTokenExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSocialMediaTokenExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/social_media_token_exposed/', 'get', metadata);
  }

  /**
   * Get "social_security_number_exposed" historical issues in a scorecard
   *
   * @summary Get "social_security_number_exposed" historical is
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSocial_security_number_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSocialSecurityNumberExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSocialSecurityNumberExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/social_security_number_exposed/', 'get', metadata);
  }

  /**
   * Get "spa_browser" historical issues in a scorecard
   *
   * @summary Get "spa_browser" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSpa_browser(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpaBrowserMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpaBrowserResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/spa_browser/', 'get', metadata);
  }

  /**
   * Get "spf_record_malformed" historical issues in a scorecard
   *
   * @summary Get "spf_record_malformed" historical issues in a 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSpf_record_malformed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordMalformedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordMalformedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/spf_record_malformed/', 'get', metadata);
  }

  /**
   * Get "spf_record_missing" historical issues in a scorecard
   *
   * @summary Get "spf_record_missing" historical issues in a sc
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSpf_record_missing(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordMissingMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordMissingResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/spf_record_missing/', 'get', metadata);
  }

  /**
   * Get "spf_record_softfail" historical issues in a scorecard
   *
   * @summary Get "spf_record_softfail" historical issues in a s
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSpf_record_softfail(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordSoftfailMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordSoftfailResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/spf_record_softfail/', 'get', metadata);
  }

  /**
   * Get "spf_record_wildcard" historical issues in a scorecard
   *
   * @summary Get "spf_record_wildcard" historical issues in a s
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSpf_record_wildcard(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordWildcardMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordWildcardResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/spf_record_wildcard/', 'get', metadata);
  }

  /**
   * Get "sql_payload_using_tor_proxy_detected" historical issues in a scorecard
   *
   * @summary Get "sql_payload_using_tor_proxy_detected" histori
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSql_payload_using_tor_proxy_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSqlPayloadUsingTorProxyDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSqlPayloadUsingTorProxyDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/sql_payload_using_tor_proxy_detected/', 'get', metadata);
  }

  /**
   * Get "ssh_weak_cipher" historical issues in a scorecard
   *
   * @summary Get "ssh_weak_cipher" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSsh_weak_cipher(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSshWeakCipherMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSshWeakCipherResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/ssh_weak_cipher/', 'get', metadata);
  }

  /**
   * Get "ssh_weak_mac" historical issues in a scorecard
   *
   * @summary Get "ssh_weak_mac" historical issues in a scorecar
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSsh_weak_mac(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSshWeakMacMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSshWeakMacResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/ssh_weak_mac/', 'get', metadata);
  }

  /**
   * Get "ssh_weak_protocol" historical issues in a scorecard
   *
   * @summary Get "ssh_weak_protocol" historical issues in a sco
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSsh_weak_protocol(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSshWeakProtocolMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSshWeakProtocolResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/ssh_weak_protocol/', 'get', metadata);
  }

  /**
   * Get "suspicious_traffic" historical issues in a scorecard
   *
   * @summary Get "suspicious_traffic" historical issues in a sc
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesSuspicious_traffic(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSuspiciousTrafficMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSuspiciousTrafficResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/suspicious_traffic/', 'get', metadata);
  }

  /**
   * Get "telephony" historical issues in a scorecard
   *
   * @summary Get "telephony" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTelephony(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTelephonyMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTelephonyResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/telephony/', 'get', metadata);
  }

  /**
   * Get "threat_actor_hosting_infrastructure" historical issues in a scorecard
   *
   * @summary Get "threat_actor_hosting_infrastructure" historic
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesThreat_actor_hosting_infrastructure(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesThreatActorHostingInfrastructureMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesThreatActorHostingInfrastructureResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/threat_actor_hosting_infrastructure/', 'get', metadata);
  }

  /**
   * Get "tls_ocsp_stapling" historical issues in a scorecard
   *
   * @summary Get "tls_ocsp_stapling" historical issues in a sco
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTls_ocsp_stapling(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlsOcspStaplingMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlsOcspStaplingResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/tls_ocsp_stapling/', 'get', metadata);
  }

  /**
   * Get "tls_weak_cipher" historical issues in a scorecard
   *
   * @summary Get "tls_weak_cipher" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTls_weak_cipher(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlsWeakCipherMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlsWeakCipherResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/tls_weak_cipher/', 'get', metadata);
  }

  /**
   * Get "tls_weak_protocol" historical issues in a scorecard
   *
   * @summary Get "tls_weak_protocol" historical issues in a sco
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTls_weak_protocol(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlsWeakProtocolMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlsWeakProtocolResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/tls_weak_protocol/', 'get', metadata);
  }

  /**
   * Get "tlscert_excessive_expiration" historical issues in a scorecard
   *
   * @summary Get "tlscert_excessive_expiration" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTlscert_excessive_expiration(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertExcessiveExpirationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertExcessiveExpirationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/tlscert_excessive_expiration/', 'get', metadata);
  }

  /**
   * Get "tlscert_expired" historical issues in a scorecard
   *
   * @summary Get "tlscert_expired" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTlscert_expired(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertExpiredMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertExpiredResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/tlscert_expired/', 'get', metadata);
  }

  /**
   * Get "tlscert_no_revocation" historical issues in a scorecard
   *
   * @summary Get "tlscert_no_revocation" historical issues in a
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTlscert_no_revocation(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertNoRevocationMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertNoRevocationResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/tlscert_no_revocation/', 'get', metadata);
  }

  /**
   * Get "tlscert_revoked" historical issues in a scorecard
   *
   * @summary Get "tlscert_revoked" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTlscert_revoked(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertRevokedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertRevokedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/tlscert_revoked/', 'get', metadata);
  }

  /**
   * Get "tlscert_self_signed" historical issues in a scorecard
   *
   * @summary Get "tlscert_self_signed" historical issues in a s
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTlscert_self_signed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertSelfSignedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertSelfSignedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/tlscert_self_signed/', 'get', metadata);
  }

  /**
   * Get "tlscert_weak_signature" historical issues in a scorecard
   *
   * @summary Get "tlscert_weak_signature" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTlscert_weak_signature(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertWeakSignatureMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertWeakSignatureResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/tlscert_weak_signature/', 'get', metadata);
  }

  /**
   * Get "tor_server" historical issues in a scorecard
   *
   * @summary Get "tor_server" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTor_server(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTorServerMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTorServerResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/tor_server/', 'get', metadata);
  }

  /**
   * Get "tor_traffic_detected" historical issues in a scorecard
   *
   * @summary Get "tor_traffic_detected" historical issues in a 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTor_traffic_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTorTrafficDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTorTrafficDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/tor_traffic_detected/', 'get', metadata);
  }

  /**
   * Get "typosquat" historical issues in a scorecard
   *
   * @summary Get "typosquat" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesTyposquat(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTyposquatMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTyposquatResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/typosquat/', 'get', metadata);
  }

  /**
   * Get "uce" historical issues in a scorecard
   *
   * @summary Get "uce" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesUce(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUceMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUceResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/uce/', 'get', metadata);
  }

  /**
   * Get "unsafe_sri_v2" historical issues in a scorecard
   *
   * @summary Get "unsafe_sri_v2" historical issues in a scoreca
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesUnsafe_sri_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUnsafeSriV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUnsafeSriV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/unsafe_sri_v2/', 'get', metadata);
  }

  /**
   * Get "upnp_accessible" historical issues in a scorecard
   *
   * @summary Get "upnp_accessible" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesUpnp_accessible(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUpnpAccessibleMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUpnpAccessibleResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/upnp_accessible/', 'get', metadata);
  }

  /**
   * Get "user_agent_string_exposed" historical issues in a scorecard
   *
   * @summary Get "user_agent_string_exposed" historical issues 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesUser_agent_string_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUserAgentStringExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUserAgentStringExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/user_agent_string_exposed/', 'get', metadata);
  }

  /**
   * Get "username_exposed" historical issues in a scorecard
   *
   * @summary Get "username_exposed" historical issues in a scor
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesUsername_exposed(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsernameExposedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsernameExposedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/username_exposed/', 'get', metadata);
  }

  /**
   * Get "uses_go_daddy_infrastructure" historical issues in a scorecard
   *
   * @summary Get "uses_go_daddy_infrastructure" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesUses_go_daddy_infrastructure(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsesGoDaddyInfrastructureMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsesGoDaddyInfrastructureResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/uses_go_daddy_infrastructure/', 'get', metadata);
  }

  /**
   * Get "uses_go_daddy_managed_wordpress" historical issues in a scorecard
   *
   * @summary Get "uses_go_daddy_managed_wordpress" historical i
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesUses_go_daddy_managed_wordpress(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsesGoDaddyManagedWordpressMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsesGoDaddyManagedWordpressResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/uses_go_daddy_managed_wordpress/', 'get', metadata);
  }

  /**
   * Get "uses_log4j" historical issues in a scorecard
   *
   * @summary Get "uses_log4j" historical issues in a scorecard
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesUses_log4j(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsesLog4JMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsesLog4JResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/uses_log4j/', 'get', metadata);
  }

  /**
   * Get "waf_detected_v2" historical issues in a scorecard
   *
   * @summary Get "waf_detected_v2" historical issues in a score
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWaf_detected_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWafDetectedV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWafDetectedV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/waf_detected_v2/', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_critical" historical issues in a scorecard
   *
   * @summary Get "web_vuln_host_critical" historical issues in 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWeb_vuln_host_critical(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostCriticalMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostCriticalResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/web_vuln_host_critical/', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_high" historical issues in a scorecard
   *
   * @summary Get "web_vuln_host_high" historical issues in a sc
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWeb_vuln_host_high(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostHighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostHighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/web_vuln_host_high/', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_low" historical issues in a scorecard
   *
   * @summary Get "web_vuln_host_low" historical issues in a sco
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWeb_vuln_host_low(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostLowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostLowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/web_vuln_host_low/', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_medium" historical issues in a scorecard
   *
   * @summary Get "web_vuln_host_medium" historical issues in a 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWeb_vuln_host_medium(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostMediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostMediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/web_vuln_host_medium/', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_v3_critical" historical issues in a scorecard
   *
   * @summary Get "web_vuln_host_v3_critical" historical issues 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWeb_vuln_host_v3_critical(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3CriticalMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3CriticalResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/web_vuln_host_v3_critical/', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_v3_high" historical issues in a scorecard
   *
   * @summary Get "web_vuln_host_v3_high" historical issues in a
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWeb_vuln_host_v3_high(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3HighMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3HighResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/web_vuln_host_v3_high/', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_v3_low" historical issues in a scorecard
   *
   * @summary Get "web_vuln_host_v3_low" historical issues in a 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWeb_vuln_host_v3_low(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3LowMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3LowResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/web_vuln_host_v3_low/', 'get', metadata);
  }

  /**
   * Get "web_vuln_host_v3_medium" historical issues in a scorecard
   *
   * @summary Get "web_vuln_host_v3_medium" historical issues in
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWeb_vuln_host_v3_medium(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3MediumMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3MediumResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/web_vuln_host_v3_medium/', 'get', metadata);
  }

  /**
   * Get "webapp_vulnerable_to_spring4shell" historical issues in a scorecard
   *
   * @summary Get "webapp_vulnerable_to_spring4shell" historical
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWebapp_vulnerable_to_spring4shell(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebappVulnerableToSpring4ShellMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebappVulnerableToSpring4ShellResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/webapp_vulnerable_to_spring4shell/', 'get', metadata);
  }

  /**
   * Get "website_copyright_expired" historical issues in a scorecard
   *
   * @summary Get "website_copyright_expired" historical issues 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWebsite_copyright_expired(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsiteCopyrightExpiredMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsiteCopyrightExpiredResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/website_copyright_expired/', 'get', metadata);
  }

  /**
   * Get "website_copyright_up_to_date" historical issues in a scorecard
   *
   * @summary Get "website_copyright_up_to_date" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWebsite_copyright_up_to_date(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsiteCopyrightUpToDateMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsiteCopyrightUpToDateResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/website_copyright_up_to_date/', 'get', metadata);
  }

  /**
   * Get "websocket_receives_data" historical issues in a scorecard
   *
   * @summary Get "websocket_receives_data" historical issues in
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWebsocket_receives_data(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsocketReceivesDataMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsocketReceivesDataResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/websocket_receives_data/', 'get', metadata);
  }

  /**
   * Get "websocket_requests_contain_sensitive_fields" historical issues in a scorecard
   *
   * @summary Get "websocket_requests_contain_sensitive_fields" 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWebsocket_requests_contain_sensitive_fields(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsocketRequestsContainSensitiveFieldsMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsocketRequestsContainSensitiveFieldsResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/websocket_requests_contain_sensitive_fields/', 'get', metadata);
  }

  /**
   * Get "websocket_sends_data" historical issues in a scorecard
   *
   * @summary Get "websocket_sends_data" historical issues in a 
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesWebsocket_sends_data(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsocketSendsDataMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsocketSendsDataResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/websocket_sends_data/', 'get', metadata);
  }

  /**
   * Get "x_content_type_options_incorrect_v2" historical issues in a scorecard
   *
   * @summary Get "x_content_type_options_incorrect_v2" historic
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesX_content_type_options_incorrect_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXContentTypeOptionsIncorrectV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXContentTypeOptionsIncorrectV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/x_content_type_options_incorrect_v2/', 'get', metadata);
  }

  /**
   * Get "x_frame_options_incorrect_v2" historical issues in a scorecard
   *
   * @summary Get "x_frame_options_incorrect_v2" historical issu
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesX_frame_options_incorrect_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXFrameOptionsIncorrectV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXFrameOptionsIncorrectV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/x_frame_options_incorrect_v2/', 'get', metadata);
  }

  /**
   * Get "x_xss_protection_incorrect_v2" historical issues in a scorecard
   *
   * @summary Get "x_xss_protection_incorrect_v2" historical iss
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesX_xss_protection_incorrect_v2(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXXssProtectionIncorrectV2MetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXXssProtectionIncorrectV2Response200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/x_xss_protection_incorrect_v2/', 'get', metadata);
  }

  /**
   * Get "xss_payload_using_tor_proxy_detected" historical issues in a scorecard
   *
   * @summary Get "xss_payload_using_tor_proxy_detected" histori
   */
  getCompaniesScorecard_identifierHistoryEventsEffective_dateIssuesXss_payload_using_tor_proxy_detected(metadata: types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXssPayloadUsingTorProxyDetectedMetadataParam): Promise<FetchResponse<200, types.GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXssPayloadUsingTorProxyDetectedResponse200>> {
    return this.core.fetch('/companies/{scorecard_identifier}/history/events/{effective_date}/issues/xss_payload_using_tor_proxy_detected/', 'get', metadata);
  }

  /**
   * Create a custom scorecard
   *
   * @summary Create a custom scorecard
   */
  postCustomScorecards(body: types.PostCustomScorecardsBodyParam): Promise<FetchResponse<200, types.PostCustomScorecardsResponse200>> {
    return this.core.fetch('/custom-scorecards', 'post', body);
  }

  /**
   * Get a custom scorecard
   *
   * @summary Get a custom scorecard
   */
  getCustomScorecardsId(metadata: types.GetCustomScorecardsIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/custom-scorecards/{id}', 'get', metadata);
  }

  /**
   * Update a custom scorecard
   *
   * @summary Update a custom scorecard
   */
  putCustomScorecardsId(metadata: types.PutCustomScorecardsIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/custom-scorecards/{id}', 'put', metadata);
  }

  /**
   * Delete a custom scorecard
   *
   * @summary Delete a custom scorecard
   */
  deleteCustomScorecardsId(metadata: types.DeleteCustomScorecardsIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/custom-scorecards/{id}', 'delete', metadata);
  }

  /**
   * Update custom scorecard filters
   *
   * @summary Update custom scorecard filters
   */
  patchCustomScorecardsIdFilters(body: types.PatchCustomScorecardsIdFiltersBodyParam, metadata: types.PatchCustomScorecardsIdFiltersMetadataParam): Promise<FetchResponse<200, types.PatchCustomScorecardsIdFiltersResponse200>> {
    return this.core.fetch('/custom-scorecards/{id}/filters', 'patch', body, metadata);
  }

  /**
   * Delete custom scorecard filters
   *
   * @summary Delete custom scorecard filters
   */
  deleteCustomScorecardsIdFilters(body: types.DeleteCustomScorecardsIdFiltersBodyParam, metadata: types.DeleteCustomScorecardsIdFiltersMetadataParam): Promise<FetchResponse<200, types.DeleteCustomScorecardsIdFiltersResponse200>> {
    return this.core.fetch('/custom-scorecards/{id}/filters', 'delete', body, metadata);
  }

  /**
   * Update custom scorecard sources
   *
   * @summary Update custom scorecard sources
   */
  patchCustomScorecardsIdSources(body: types.PatchCustomScorecardsIdSourcesBodyParam, metadata: types.PatchCustomScorecardsIdSourcesMetadataParam): Promise<FetchResponse<200, types.PatchCustomScorecardsIdSourcesResponse200>> {
    return this.core.fetch('/custom-scorecards/{id}/sources', 'patch', body, metadata);
  }

  /**
   * Delete custom scorecard sources
   *
   * @summary Delete custom scorecard sources
   */
  deleteCustomScorecardsIdSources(body: types.DeleteCustomScorecardsIdSourcesBodyParam, metadata: types.DeleteCustomScorecardsIdSourcesMetadataParam): Promise<FetchResponse<200, types.DeleteCustomScorecardsIdSourcesResponse200>> {
    return this.core.fetch('/custom-scorecards/{id}/sources', 'delete', body, metadata);
  }

  /**
   * Get all available compliance frameworks
   *
   * @summary Get all available compliance frameworks
   */
  getComplianceFrameworks(): Promise<FetchResponse<200, types.GetComplianceFrameworksResponse200>> {
    return this.core.fetch('/compliance-frameworks', 'get');
  }

  /**
   * Get a compliance framework details
   *
   * @summary Get a compliance framework details
   */
  getComplianceFrameworksKey(metadata: types.GetComplianceFrameworksKeyMetadataParam): Promise<FetchResponse<200, types.GetComplianceFrameworksKeyResponse200>> {
    return this.core.fetch('/compliance-frameworks/{key}', 'get', metadata);
  }

  /**
   * Returns a list of third-party vendors used by the companies in a given portfolio 
   *
   *  **Note: Requires access to AVD with Enhanced Illumination**
   *
   * @summary Get third party vendors by portfolio ID
   */
  getVendorDetectionPortfoliosPortfolioid(metadata: types.GetVendorDetectionPortfoliosPortfolioidMetadataParam): Promise<FetchResponse<200, types.GetVendorDetectionPortfoliosPortfolioidResponse200> | FetchResponse<number, types.GetVendorDetectionPortfoliosPortfolioidResponseDefault>> {
    return this.core.fetch('/vendor-detection/portfolios/{portfolioId}', 'get', metadata);
  }

  /**
   * Returns a list of fourth party vendors connected to the given domain 
   *
   *  **Note: Requires access to AVD with Enhanced Illumination**
   *
   * @summary Get fourth party vendors by domain
   */
  getVendorDetectionDomainFourthParty(metadata: types.GetVendorDetectionDomainFourthPartyMetadataParam): Promise<FetchResponse<200, types.GetVendorDetectionDomainFourthPartyResponse200> | FetchResponse<number, types.GetVendorDetectionDomainFourthPartyResponseDefault>> {
    return this.core.fetch('/vendor-detection/{domain}/fourth-party', 'get', metadata);
  }

  /**
   * Returns a list of products used by the given domain  
   *
   *  **Note: Requires access to AVD with Enhanced Illumination**
   *
   * @summary Get products by domain
   */
  getVendorDetectionDomainProducts(metadata: types.GetVendorDetectionDomainProductsMetadataParam): Promise<FetchResponse<200, types.GetVendorDetectionDomainProductsResponse200> | FetchResponse<number, types.GetVendorDetectionDomainProductsResponseDefault>> {
    return this.core.fetch('/vendor-detection/{domain}/products', 'get', metadata);
  }

  /**
   * Returns the supply chain risk score for a given domain 
   *
   *  **Note: Requires access to AVD with Enhanced Illumination**
   *
   * @summary Get risk score by domain
   */
  getVendorDetectionDomainRisk(metadata: types.GetVendorDetectionDomainRiskMetadataParam): Promise<FetchResponse<200, types.GetVendorDetectionDomainRiskResponse200> | FetchResponse<number, types.GetVendorDetectionDomainRiskResponseDefault>> {
    return this.core.fetch('/vendor-detection/{domain}/risk', 'get', metadata);
  }

  /**
   * Returns a list of third party vendors connected to the given domain 
   *
   *  **Note: Requires access to AVD with Enhanced Illumination**
   *
   * @summary Get third party vendors by domain
   */
  getVendorDetectionDomainThirdParty(metadata: types.GetVendorDetectionDomainThirdPartyMetadataParam): Promise<FetchResponse<200, types.GetVendorDetectionDomainThirdPartyResponse200> | FetchResponse<number, types.GetVendorDetectionDomainThirdPartyResponseDefault>> {
    return this.core.fetch('/vendor-detection/{domain}/third-party', 'get', metadata);
  }

  /**
   * Get an industry's historical scores
   *
   */
  getIndustriesIndustryHistoryScore(metadata: types.GetIndustriesIndustryHistoryScoreMetadataParam): Promise<FetchResponse<200, types.GetIndustriesIndustryHistoryScoreResponse200>> {
    return this.core.fetch('/industries/{industry}/history/score', 'get', metadata);
  }

  /**
   * Note: requesting a report for a company where score is still calculating will be
   * accepted, but might fail to generate if a score is not determined soon enough. It's
   * recommended to check a score is available before requesting a report
   *
   * @summary Generate a Company Detailed report
   */
  postReportsDetailed(body: types.PostReportsDetailedBodyParam): Promise<FetchResponse<200, types.PostReportsDetailedResponse200>> {
    return this.core.fetch('/reports/detailed', 'post', body);
  }

  /**
   * Note: requesting a report for a company where score is still calculating will be
   * accepted, but might fail to generate if a score is not determined soon enough. It's
   * recommended to check a score is available before requesting a report
   *
   * @summary Generate a Company Events report
   */
  postReportsEventsJson(body: types.PostReportsEventsJsonBodyParam): Promise<FetchResponse<200, types.PostReportsEventsJsonResponse200>> {
    return this.core.fetch('/reports/events-json', 'post', body);
  }

  /**
   * Note: this endpoint should not be used directly. The URL, to be used, is provided in the
   * GET /reports/recent response.
   *
   * @summary Download a generated report
   */
  getReportsFilesFile_path(metadata: types.GetReportsFilesFilePathMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/reports/files/{file_path}', 'get', metadata);
  }

  /**
   * Note: requesting a report for a company where score is still calculating will be
   * accepted, but might fail to generate if a score is not determined soon enough. It's
   * recommended to check a score is available before requesting a report
   *
   * @summary Generate a CSV containing Scorecard Domains
   */
  postReportsFootprintDomains(body: types.PostReportsFootprintDomainsBodyParam): Promise<FetchResponse<200, types.PostReportsFootprintDomainsResponse200>> {
    return this.core.fetch('/reports/footprint-domains', 'post', body);
  }

  /**
   * Note: requesting a report for a company where score is still calculating will be
   * accepted, but might fail to generate if a score is not determined soon enough. It's
   * recommended to check a score is available before requesting a report
   *
   * @summary Generate a CSV containing Scorecard IPs
   */
  postReportsFootprintIps(body: types.PostReportsFootprintIpsBodyParam): Promise<FetchResponse<200, types.PostReportsFootprintIpsResponse200>> {
    return this.core.fetch('/reports/footprint-ips', 'post', body);
  }

  /**
   * Note: requesting a report for a company where score is still calculating will be
   * accepted, but might fail to generate if a score is not determined soon enough. It's
   * recommended to check a score is available before requesting a report
   *
   * @summary Generate a Full Scorecard report
   */
  postReportsFullScorecardJson(body: types.PostReportsFullScorecardJsonBodyParam): Promise<FetchResponse<200, types.PostReportsFullScorecardJsonResponse200>> {
    return this.core.fetch('/reports/full-scorecard-json', 'post', body);
  }

  /**
   * Note: requesting a report for a company where score is still calculating will be
   * accepted, but might fail to generate if a score is not determined soon enough. It's
   * recommended to check a score is available before requesting a report
   *
   * @summary Generate a Company Issues report
   */
  postReportsIssues(body: types.PostReportsIssuesBodyParam): Promise<FetchResponse<200, types.PostReportsIssuesResponse200>> {
    return this.core.fetch('/reports/issues', 'post', body);
  }

  /**
   * Note: requesting a report for a company where score is still calculating will be
   * accepted, but might fail to generate if a score is not determined soon enough. It's
   * recommended to check a score is available before requesting a report
   *
   * @summary Generate a Company Partnership report
   */
  postReportsPartnership(body: types.PostReportsPartnershipBodyParam): Promise<FetchResponse<200, types.PostReportsPartnershipResponse200>> {
    return this.core.fetch('/reports/partnership', 'post', body);
  }

  /**
   * Generate a Portfolio report
   *
   */
  postReportsPortfolio(body: types.PostReportsPortfolioBodyParam): Promise<FetchResponse<200, types.PostReportsPortfolioResponse200>> {
    return this.core.fetch('/reports/portfolio', 'post', body);
  }

  /**
   * Get reports you have generated recently
   *
   */
  getReportsRecent(): Promise<FetchResponse<200, types.GetReportsRecentResponse200>> {
    return this.core.fetch('/reports/recent', 'get');
  }

  /**
   * deprecated, use /reports/footprints-ips and /reports/footprint-domains instead
   *
   * @summary Generate a Scorecard Footprint report
   */
  postReportsScorecardFootprint(body: types.PostReportsScorecardFootprintBodyParam): Promise<FetchResponse<200, types.PostReportsScorecardFootprintResponse200>> {
    return this.core.fetch('/reports/scorecard-footprint', 'post', body);
  }

  /**
   * Note: requesting a report for a company where score is still calculating will be
   * accepted, but might fail to generate if a score is not determined soon enough. It's
   * recommended to check a score is available before requesting a report
   *
   * @summary Generate a Company Summary report
   */
  postReportsSummary(body: types.PostReportsSummaryBodyParam): Promise<FetchResponse<200, types.PostReportsSummaryResponse200>> {
    return this.core.fetch('/reports/summary', 'post', body);
  }

  /**
   * Create a new invitation for a new user/vendor
   *
   * @summary Create a new invitation for a new user/vendor
   */
  postInvitations(body: types.PostInvitationsBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/invitations', 'post', body);
  }

  /**
   * Send a new feedback validation request on findings from a specific issue type and
   * initializes Auto Remediation (skipping the creation of the zendesk support ticket).
   *
   * @summary Send a new feedback validation request on findings
   */
  postCompaniesDomainIssuesTypeFeedbackValidationRequest(body: types.PostCompaniesDomainIssuesTypeFeedbackValidationRequestBodyParam, metadata: types.PostCompaniesDomainIssuesTypeFeedbackValidationRequestMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/companies/{domain}/issues/{type}/feedback-validation-request', 'post', body, metadata);
  }

  /**
   * Send new feedback on findings from a specific issue type
   *
   * @summary Send new feedback on findings from a specific issu
   */
  postCompaniesDomainIssuesTypeFeedback(body: types.PostCompaniesDomainIssuesTypeFeedbackBodyParam, metadata: types.PostCompaniesDomainIssuesTypeFeedbackMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/companies/{domain}/issues/{type}/feedback/', 'post', body, metadata);
  }

  /**
   * Get metadata for the factors used when scoring companies
   *
   * @summary Get metadata for the factors used when scoring com
   */
  getMetadataFactors(): Promise<FetchResponse<200, types.GetMetadataFactorsResponse200>> {
    return this.core.fetch('/metadata/factors', 'get');
  }

  /**
   * Get metadata for all issue types that can be detected in a company
   *
   * @summary Get metadata for all issue types that can be detec
   */
  getMetadataIssueTypes(): Promise<FetchResponse<200, types.GetMetadataIssueTypesResponse200>> {
    return this.core.fetch('/metadata/issue-types', 'get');
  }

  /**
   * Get detailed metadata for the issue type
   *
   * @summary Get detailed metadata for the issue type
   */
  getMetadataIssueTypesType(metadata: types.GetMetadataIssueTypesTypeMetadataParam): Promise<FetchResponse<200, types.GetMetadataIssueTypesTypeResponse200>> {
    return this.core.fetch('/metadata/issue-types/{type}', 'get', metadata);
  }

  /**
   * Get all notifications from latest 7 days
   *
   * @summary Get all notifications from latest 7 days
   */
  getUsersByUsernameUsernameNotificationsRecent(metadata: types.GetUsersByUsernameUsernameNotificationsRecentMetadataParam): Promise<FetchResponse<200, types.GetUsersByUsernameUsernameNotificationsRecentResponse200>> {
    return this.core.fetch('/users/by-username/{username}/notifications/recent', 'get', metadata);
  }

  /**
   * Returns SAML Service Provider metadata
   *
   * @summary Returns SAML Service Provider metadata
   */
  getV1SamlMetadataServiceProvider(): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/v1/saml/metadata/service-provider', 'get');
  }

  /**
   * Creates an app job
   *
   */
  postAppsByAppidJobs(body: types.PostAppsByAppidJobsBodyParam, metadata: types.PostAppsByAppidJobsMetadataParam): Promise<FetchResponse<201, types.PostAppsByAppidJobsResponse201>> {
    return this.core.fetch('/apps/{appId}/jobs', 'post', body, metadata);
  }

  /**
   * Update a Job
   *
   */
  putAppsByAppidJobsByJobid(body: types.PutAppsByAppidJobsByJobidBodyParam, metadata: types.PutAppsByAppidJobsByJobidMetadataParam): Promise<FetchResponse<200, types.PutAppsByAppidJobsByJobidResponse200>> {
    return this.core.fetch('/apps/{appId}/jobs/{jobId}', 'put', body, metadata);
  }

  /**
   * Get plans list
   *
   */
  getPlans(metadata?: types.GetPlansMetadataParam): Promise<FetchResponse<200, types.GetPlansResponse200>> {
    return this.core.fetch('/plans', 'get', metadata);
  }

  /**
   * Archive list of plans by ID
   *
   */
  postPlansArchive(body: types.PostPlansArchiveBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/plans/archive', 'post', body);
  }

  /**
   * Create new factor score improvement plan
   *
   */
  postPlansFactorScoreImprovement(body: types.PostPlansFactorScoreImprovementBodyParam): Promise<FetchResponse<201, types.PostPlansFactorScoreImprovementResponse201>> {
    return this.core.fetch('/plans/factor-score-improvement', 'post', body);
  }

  /**
   * Update partially the factor score improvement plan by ID
   *
   */
  patchPlansFactorScoreImprovementById(body: types.PatchPlansFactorScoreImprovementByIdBodyParam, metadata: types.PatchPlansFactorScoreImprovementByIdMetadataParam): Promise<FetchResponse<number, unknown>>;
  patchPlansFactorScoreImprovementById(metadata: types.PatchPlansFactorScoreImprovementByIdMetadataParam): Promise<FetchResponse<number, unknown>>;
  patchPlansFactorScoreImprovementById(body?: types.PatchPlansFactorScoreImprovementByIdBodyParam | types.PatchPlansFactorScoreImprovementByIdMetadataParam, metadata?: types.PatchPlansFactorScoreImprovementByIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/plans/factor-score-improvement/{id}', 'patch', body, metadata);
  }

  /**
   * Create new issue resolution plan
   *
   */
  postPlansIssueResolution(body: types.PostPlansIssueResolutionBodyParam): Promise<FetchResponse<201, types.PostPlansIssueResolutionResponse201>> {
    return this.core.fetch('/plans/issue-resolution', 'post', body);
  }

  /**
   * Update partially the issue resolution plan by ID
   *
   */
  patchPlansIssueResolutionById(body: types.PatchPlansIssueResolutionByIdBodyParam, metadata: types.PatchPlansIssueResolutionByIdMetadataParam): Promise<FetchResponse<number, unknown>>;
  patchPlansIssueResolutionById(metadata: types.PatchPlansIssueResolutionByIdMetadataParam): Promise<FetchResponse<number, unknown>>;
  patchPlansIssueResolutionById(body?: types.PatchPlansIssueResolutionByIdBodyParam | types.PatchPlansIssueResolutionByIdMetadataParam, metadata?: types.PatchPlansIssueResolutionByIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/plans/issue-resolution/{id}', 'patch', body, metadata);
  }

  /**
   * Create new overall score improvement plan
   *
   */
  postPlansOverallScoreImprovement(body: types.PostPlansOverallScoreImprovementBodyParam): Promise<FetchResponse<201, types.PostPlansOverallScoreImprovementResponse201>> {
    return this.core.fetch('/plans/overall-score-improvement', 'post', body);
  }

  /**
   * Update partially the overall score improvement plan by ID
   *
   */
  patchPlansOverallScoreImprovementById(body: types.PatchPlansOverallScoreImprovementByIdBodyParam, metadata: types.PatchPlansOverallScoreImprovementByIdMetadataParam): Promise<FetchResponse<number, unknown>>;
  patchPlansOverallScoreImprovementById(metadata: types.PatchPlansOverallScoreImprovementByIdMetadataParam): Promise<FetchResponse<number, unknown>>;
  patchPlansOverallScoreImprovementById(body?: types.PatchPlansOverallScoreImprovementByIdBodyParam | types.PatchPlansOverallScoreImprovementByIdMetadataParam, metadata?: types.PatchPlansOverallScoreImprovementByIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/plans/overall-score-improvement/{id}', 'patch', body, metadata);
  }

  /**
   * Unarchive list of plans by ID
   *
   */
  postPlansUnarchive(body: types.PostPlansUnarchiveBodyParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/plans/unarchive', 'post', body);
  }

  /**
   * Get plan by ID
   *
   */
  getPlansById(metadata: types.GetPlansByIdMetadataParam): Promise<FetchResponse<200, types.GetPlansByIdResponse200>> {
    return this.core.fetch('/plans/{id}', 'get', metadata);
  }

  /**
   * Delete plan by ID
   *
   */
  deletePlansById(metadata: types.DeletePlansByIdMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/plans/{id}', 'delete', metadata);
  }

  /**
   * Add guests to plan by ID
   *
   */
  postPlansByIdGuests(body: types.PostPlansByIdGuestsBodyParam, metadata: types.PostPlansByIdGuestsMetadataParam): Promise<FetchResponse<201, types.PostPlansByIdGuestsResponse201>> {
    return this.core.fetch('/plans/{id}/guests', 'post', body, metadata);
  }

  /**
   * Remove guests from plan by ID
   *
   */
  deletePlansByIdGuests(body: types.DeletePlansByIdGuestsBodyParam, metadata: types.DeletePlansByIdGuestsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/plans/{id}/guests', 'delete', body, metadata);
  }

  /**
   * Remove item from plan
   *
   */
  deletePlansByIdItems(body: types.DeletePlansByIdItemsBodyParam, metadata: types.DeletePlansByIdItemsMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/plans/{id}/items', 'delete', body, metadata);
  }

  /**
   * Add companies in bulk to a portfolios
   *
   * @summary Add companies in bulk to a portfolios
   */
  putPortfoliosCompaniesBulkUpload(body: types.PutPortfoliosCompaniesBulkUploadBodyParam, metadata?: types.PutPortfoliosCompaniesBulkUploadMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/portfolios/companies/bulk-upload', 'put', body, metadata);
  }

  /**
   * Remove all companies from a portfolio
   *
   * @summary Remove all companies from a portfolio
   */
  deletePortfoliosIdCompaniesAll(metadata: types.DeletePortfoliosIdCompaniesAllMetadataParam): Promise<FetchResponse<number, unknown>> {
    return this.core.fetch('/portfolios/{id}/companies/all', 'delete', metadata);
  }
}

const createSDK = (() => { return new SDK(); })()
;

export default createSDK;

export type { DeleteApiByParentdomainDomainByDomainAssociateTagsByTagidBodyParam, DeleteApiByParentdomainDomainByDomainAssociateTagsByTagidMetadataParam, DeleteApiByParentdomainDomainByDomainAssociateTagsByTagidResponse200, DeleteApiByParentdomainIpByIpAssociateTagsByTagidBodyParam, DeleteApiByParentdomainIpByIpAssociateTagsByTagidMetadataParam, DeleteApiByParentdomainIpByIpAssociateTagsByTagidResponse200, DeleteApiByTagidMetadataParam, DeleteApiGroupsByTaggroupidAssociationByTagidBodyParam, DeleteApiGroupsByTaggroupidAssociationByTagidMetadataParam, DeleteApiGroupsByTaggroupidAssociationByTagidResponse200, DeleteApiTagGroupsByIdMetadataParam, DeleteCustomScorecardsIdFiltersBodyParam, DeleteCustomScorecardsIdFiltersMetadataParam, DeleteCustomScorecardsIdFiltersResponse200, DeleteCustomScorecardsIdMetadataParam, DeleteCustomScorecardsIdSourcesBodyParam, DeleteCustomScorecardsIdSourcesMetadataParam, DeleteCustomScorecardsIdSourcesResponse200, DeletePlansByIdGuestsBodyParam, DeletePlansByIdGuestsMetadataParam, DeletePlansByIdItemsBodyParam, DeletePlansByIdItemsMetadataParam, DeletePlansByIdMetadataParam, DeletePortfoliosIdCompaniesAllMetadataParam, DeletePortfoliosPortfolioIdCompaniesDomainMetadataParam, DeletePortfoliosPortfolioIdMetadataParam, DeleteScorecardTagsGroupsIdMetadataParam, DeleteScorecardTagsIdCompaniesDomainMetadataParam, DeleteScorecardTagsIdMetadataParam, DeleteScorecardTagsTagIdGroupsTagGroupIdMetadataParam, GetApiByParentdomainDomainRelatedTagsMetadataParam, GetApiByParentdomainDomainRelatedTagsResponse200, GetApiByParentdomainIpRelatedTagsMetadataParam, GetApiByParentdomainIpRelatedTagsResponse200, GetApiResponse200, GetApiTagGroupsByIdMetadataParam, GetApiTagGroupsByIdResponse200, GetByParentdomainTagGroupsResponse200, GetCompaniesDomainHistoryEventsBreachesMetadataParam, GetCompaniesDomainHistoryEventsBreachesResponse200, GetCompaniesDomainIssueContextIssueTypeMetadataParam, GetCompaniesDomainIssueContextIssueTypeResponse200, GetCompaniesDomainScorePlansByTargetScoreMetadataParam, GetCompaniesDomainScorePlansByTargetScoreResponse200, GetCompaniesScorecardIdentifierExpandedRiskMetadataParam, GetCompaniesScorecardIdentifierExpandedRiskResponse200, GetCompaniesScorecardIdentifierExpandedRiskResponseDefault, GetCompaniesScorecardIdentifierFactorsMetadataParam, GetCompaniesScorecardIdentifierFactorsResponse200, GetCompaniesScorecardIdentifierFactorsResponse400, GetCompaniesScorecardIdentifierFactorsResponse401, GetCompaniesScorecardIdentifierFactorsResponse403, GetCompaniesScorecardIdentifierFactorsResponse404, GetCompaniesScorecardIdentifierFactorsResponse429, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesActiveCveExploitationAttemptedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesActiveCveExploitationAttemptedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAdminSubdomainV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAdminSubdomainV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAdwareInstallationMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAdwareInstallationResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAdwareInstallationTrailMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAdwareInstallationTrailResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAgeExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAgeExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAllegedBreachIncidentMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAllegedBreachIncidentResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAnonymousProxyMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAnonymousProxyResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesApiKeyExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesApiKeyExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAttackDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAttackDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAttemptedInformationLeakMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesAttemptedInformationLeakResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesBirthdayExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesBirthdayExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesBitcoinServerMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesBitcoinServerResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesBrowserLogsContainDebugMessageMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesBrowserLogsContainDebugMessageResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCdnHostingMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCdnHostingResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCleartextPasswordExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCleartextPasswordExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCobaltStrikeC2DetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCobaltStrikeC2DetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCobaltStrikeC2ServiceMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCobaltStrikeC2ServiceResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCommunicationServerWithExpiredCertMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCommunicationServerWithExpiredCertResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCommunicationWithServerCertificateIssuedByBlacklistedCountryMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCommunicationWithServerCertificateIssuedByBlacklistedCountryResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCompromisedByInformationStealerMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCompromisedByInformationStealerResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCompromisedCredentialsFoundMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCompromisedCredentialsFoundResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesContactInformationDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesContactInformationDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCookieMissingHttpOnlyMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCookieMissingHttpOnlyResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCookieMissingSecureAttributeMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCookieMissingSecureAttributeResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCspNoPolicyV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCspNoPolicyV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCspTooBroadV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCspTooBroadV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCspUnsafePolicyV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCspUnsafePolicyV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCveInUseByThreatActorMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesCveInUseByThreatActorResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesDomainMissingHttpsV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesDomainMissingHttpsV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesDosAttackAttemptDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesDosAttackAttemptDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesEmailExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesEmailExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesEmployerExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesEmployerExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExploitAttemptDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExploitAttemptDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExploitedProductMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExploitedProductResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedCiscoWebUiMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedCiscoWebUiResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedEmbeddedIotWebServerMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedEmbeddedIotWebServerResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedIscsiDeviceMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedIscsiDeviceResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedMacAirportDeviceMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedMacAirportDeviceResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedMobilePrintingServiceMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedMobilePrintingServiceResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedNetworkAttachedStorageDeviceMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedNetworkAttachedStorageDeviceResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedPersonalInformationInfoMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedPersonalInformationInfoResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedPersonalInformationMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedPersonalInformationResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedPrinterMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesExposedPrinterResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesFailToLoadPageComponentsMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesFailToLoadPageComponentsResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesGeneralScanDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesGeneralScanDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHashedPasswordExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHashedPasswordExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHistoricalCompromisedCredentialsFoundMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHistoricalCompromisedCredentialsFoundResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHostedOnObjectStorageV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHostedOnObjectStorageV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHstsIncorrectV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesHstsIncorrectV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIndustrialControlDeviceMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIndustrialControlDeviceResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureFtpMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureFtpResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureHttpsRedirectPatternV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureHttpsRedirectPatternV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureServerCertificateKeySizeMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureServerCertificateKeySizeResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureTelnetMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInsecureTelnetResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInstantMessagingAccountExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesInstantMessagingAccountExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIotCameraMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIotCameraResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIpAddressExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIpAddressExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIpBlackListDueMaliciousActivityMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIpBlackListDueMaliciousActivityResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssAccountLockoutThresholdEnabledMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssAccountLockoutThresholdEnabledResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssAdminServiceDownMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssAdminServiceDownResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssAllDeviceSensorPolicyAppliedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssAllDeviceSensorPolicyAppliedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssCompletedVulnerabilityManagementScansMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssCompletedVulnerabilityManagementScansResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDatabaseInstancesNotEncryptedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDatabaseInstancesNotEncryptedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedCveLinuxInstanceMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedCveLinuxInstanceResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedCveWindowsInstanceMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedCveWindowsInstanceResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedOsInCloudVmMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedOsInCloudVmResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedSoftwareInCloudVmMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDetectedSoftwareInCloudVmResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceControlPolicyNotAppliedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceControlPolicyNotAppliedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceFirewallPolicyNotAppliedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceFirewallPolicyNotAppliedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDevicePreventionPolicyNotAppliedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDevicePreventionPolicyNotAppliedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceRemoteResponsePolicyNotAppliedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceRemoteResponsePolicyNotAppliedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceSensorUpdatePolicyNotAppliedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDeviceSensorUpdatePolicyNotAppliedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDigitalFootprintHostnameMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDigitalFootprintHostnameResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDigitalFootprintIpMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssDigitalFootprintIpResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssEndpointSecurityProductDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssEndpointSecurityProductDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssEphemeralDisksNotEncryptedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssEphemeralDisksNotEncryptedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsGoodZtcAuditScoresMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsGoodZtcAuditScoresResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsLowZtcAuditScoresMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsLowZtcAuditScoresResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsMediumZtcAuditScoresMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsMediumZtcAuditScoresResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsVeryLowZtcAuditScoresMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFactorsSettingsVeryLowZtcAuditScoresResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFailed2FaAuthenticationMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssFailed2FaAuthenticationResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusPresentMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusPresentResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusServiceExpiredMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusServiceExpiredResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusServiceNotValidMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusServiceNotValidResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusServiceValidMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusServiceValidResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusSignaturesOutOfDateMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusSignaturesOutOfDateResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusSignaturesUpdatedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGatewayAntivirusSignaturesUpdatedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGoodOverallZtcAuditScoreMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssGoodOverallZtcAuditScoreResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssHostBasedFirewallPresentMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssHostBasedFirewallPresentResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssHostVulnerableToCveDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssHostVulnerableToCveDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssHttpAntivirusScanEnabledMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssHttpAntivirusScanEnabledResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssIncidentClosedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssIncidentClosedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssIncidentDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssIncidentDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssLowAverageOverallZtcAuditScoreMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssLowAverageOverallZtcAuditScoreResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssMediumOverallZtcAuditScoreMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssMediumOverallZtcAuditScoreResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssObjectStorageBucketsAllowPublicAccessMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssObjectStorageBucketsAllowPublicAccessResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssObjectStorageBucketsNotEncryptedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssObjectStorageBucketsNotEncryptedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOsSettingsNotMeetZeroTrustRequirementsMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOsSettingsNotMeetZeroTrustRequirementsResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOutOfDateEndpointSecurityMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOutOfDateEndpointSecurityResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOutOfDateFirmwareMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOutOfDateFirmwareResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOutOfDateOperatingSystemMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssOutOfDateOperatingSystemResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssPasswordPolicyAllowsReuseMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssPasswordPolicyAllowsReuseResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssPasswordPolicyNoRegularUpdatesMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssPasswordPolicyNoRegularUpdatesResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssPersistentDisksNotEncryptedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssPersistentDisksNotEncryptedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssQueuesEncryptedWithProviderManagedKeyMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssQueuesEncryptedWithProviderManagedKeyResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssQueuesNotEncryptedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssQueuesNotEncryptedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssRootAccountHasAccessKeysMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssRootAccountHasAccessKeysResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssRootAccountWithoutMfaEnabledMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssRootAccountWithoutMfaEnabledResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssSensorPoliciesNotMeetZeroTrustRequirementsMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssSensorPoliciesNotMeetZeroTrustRequirementsResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssStrongMinimumPasswordLengthSetMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssStrongMinimumPasswordLengthSetResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssThreatDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssThreatDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssThreatRemediatedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssThreatRemediatedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithAccessKeysNotRotatedRegularlyMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithAccessKeysNotRotatedRegularlyResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithPasswordsNotRotatedRegularlyMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithPasswordsNotRotatedRegularlyResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithUnusedAccessKeysMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithUnusedAccessKeysResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithUnusedPasswordsMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssUsersWithUnusedPasswordsResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssVeryLowOverallZtcAuditScoreMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesIssVeryLowOverallZtcAuditScoreResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesJavaDebuggerMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesJavaDebuggerResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesKnownCompromisedOrHostileHostMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesKnownCompromisedOrHostileHostResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLanguageExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLanguageExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLeakedCredentialsInfoMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLeakedCredentialsInfoResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLeakedCredentialsMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLeakedCredentialsResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLinksToInsecureWebsiteMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLinksToInsecureWebsiteResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLocalFilePathExposedViaUrlSchemeMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesLocalFilePathExposedViaUrlSchemeResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMailServerUnusualPortMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMailServerUnusualPortResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousBotnetCAndCServerDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousBotnetCAndCServerDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousScanDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousScanDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousTorExitNodeDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousTorExitNodeDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousTorRelayRouterNodeDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousTorRelayRouterNodeDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousUserAgentDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMaliciousUserAgentDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareControllerMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareControllerResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareInfectionMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareInfectionResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareInfectionTrailMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMalwareInfectionTrailResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMicrosoftExchange0DayVulnerabilityMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMicrosoftExchange0DayVulnerabilityResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMicrosoftExchangeHttpApiVulnerabilityMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMicrosoftExchangeHttpApiVulnerabilityResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMinecraftServerMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMinecraftServerResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMiraiBotnetTrafficDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMiraiBotnetTrafficDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMysqlServerEmptyPasswordMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesMysqlServerEmptyPasswordResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesNameExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesNameExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesNonSocialMediaAccessTokenExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesNonSocialMediaAccessTokenExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOccupationExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOccupationExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOpenPortMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOpenPortResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOpensslCriticalVulnerabilityMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOpensslCriticalVulnerabilityResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedBrowserDomainMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedBrowserDomainResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedBrowserMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedBrowserResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedOsDomainMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedOsDomainResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedOsMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesOutdatedOsResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesParentsNameExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesParentsNameExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPasswordExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPasswordExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPasswordHintExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPasswordHintExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingAnalysisHighMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingAnalysisHighResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingAnalysisLowMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingAnalysisLowResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingAnalysisMediumMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingAnalysisMediumResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceCriticalMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceCriticalResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceHighMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceHighResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceInfoMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceInfoResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceLowMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceLowResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceMediumMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceMediumResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3CriticalMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3CriticalResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3HighMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3HighResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3LowMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3LowResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3MediumMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPatchingCadenceV3MediumResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPaymentProviderMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPaymentProviderResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPhishingMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPhishingResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPhoneNumberExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPhoneNumberExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPhysicalAddressExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPhysicalAddressExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCiscoRv320325MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCiscoRv320325Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202333246MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202333246Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202334362MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202334362Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve20233519MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve20233519Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202337582MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202337582Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202337979MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202337979Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202338035MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202338035Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202346747MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202346747Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202421887MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202421887Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202446805MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableCve202446805Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPotentiallyVulnerableResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesProductExploitedByRansomwareActorsMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesProductExploitedByRansomwareActorsResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesProductUsesVulnerableLog4JMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesProductUsesVulnerableLog4JResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPvaInstallationMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPvaInstallationResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPvaInstallationTrailMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesPvaInstallationTrailResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRaceExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRaceExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareAssociationMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareAssociationResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareInfectionMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareInfectionResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareInfectionTrailMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareInfectionTrailResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareVictimMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRansomwareVictimResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRedirectChainContainsHttpV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRedirectChainContainsHttpV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRedirectToInsecureWebsiteMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRedirectToInsecureWebsiteResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesReferencesObjectStorageV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesReferencesObjectStorageV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRemoteAccessMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesRemoteAccessResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSecurityQuestionAndAnswerExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSecurityQuestionAndAnswerExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSensitiveDataExposureThroughInsecureChannelMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSensitiveDataExposureThroughInsecureChannelResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServerErrorMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServerErrorResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceCassandraMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceCassandraResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceCloudProviderMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceCloudProviderResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceCouchdbMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceCouchdbResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceDnsMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceDnsResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceElasticsearchMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceElasticsearchResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceEndOfLifeMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceEndOfLifeResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceEndOfServiceMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceEndOfServiceResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceFtpMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceFtpResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceHttpProxyMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceHttpProxyResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceImapMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceImapResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceLdapAnonymousMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceLdapAnonymousResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceLdapMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceLdapResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceMicrosoftSqlMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceMicrosoftSqlResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceMongodbMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceMongodbResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceMysqlMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceMysqlResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceNeo4JMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceNeo4JResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceNetbusRemoteAccessMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceNetbusRemoteAccessResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceNetworkingMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceNetworkingResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceOpenVpnMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceOpenVpnResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceOracleDbMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceOracleDbResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceOracleRegistryMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceOracleRegistryResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePop3MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePop3Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePostgresqlMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePostgresqlResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePptpMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePptpResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePulseVpnMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServicePulseVpnResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceRdpMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceRdpResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceRedisMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceRedisResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceRsyncMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceRsyncResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceSmbMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceSmbResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceSoapMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceSoapResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceSocksProxyMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceSocksProxyResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceTelnetMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceTelnetResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVncMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVncResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostCriticalMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostCriticalResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostHighMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostHighResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostInfoMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostInfoResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostLowMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostLowResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostMediumMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostMediumResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3CriticalMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3CriticalResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3HighMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3HighResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3LowMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3LowResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3MediumMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesServiceVulnHostV3MediumResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSiteEmitsBrowserLogMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSiteEmitsBrowserLogResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSiteRequestsDataOverInsecureChannelMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSiteRequestsDataOverInsecureChannelResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSiteUsesHstsPreloadingV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSiteUsesHstsPreloadingV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSocialMediaAccountExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSocialMediaAccountExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSocialMediaTokenExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSocialMediaTokenExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSocialSecurityNumberExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSocialSecurityNumberExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpaBrowserMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpaBrowserResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordMalformedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordMalformedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordMissingMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordMissingResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordSoftfailMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordSoftfailResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordWildcardMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSpfRecordWildcardResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSqlPayloadUsingTorProxyDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSqlPayloadUsingTorProxyDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSshWeakCipherMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSshWeakCipherResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSshWeakMacMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSshWeakMacResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSshWeakProtocolMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSshWeakProtocolResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSuspiciousTrafficMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesSuspiciousTrafficResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTelephonyMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTelephonyResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesThreatActorHostingInfrastructureMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesThreatActorHostingInfrastructureResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlsOcspStaplingMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlsOcspStaplingResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlsWeakCipherMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlsWeakCipherResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlsWeakProtocolMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlsWeakProtocolResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertExcessiveExpirationMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertExcessiveExpirationResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertExpiredMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertExpiredResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertNoRevocationMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertNoRevocationResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertRevokedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertRevokedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertSelfSignedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertSelfSignedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertWeakSignatureMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTlscertWeakSignatureResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTorServerMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTorServerResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTorTrafficDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTorTrafficDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTyposquatMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesTyposquatResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUceMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUceResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUnsafeSriV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUnsafeSriV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUpnpAccessibleMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUpnpAccessibleResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUserAgentStringExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUserAgentStringExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsernameExposedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsernameExposedResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsesGoDaddyInfrastructureMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsesGoDaddyInfrastructureResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsesGoDaddyManagedWordpressMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsesGoDaddyManagedWordpressResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsesLog4JMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesUsesLog4JResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWafDetectedV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWafDetectedV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostCriticalMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostCriticalResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostHighMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostHighResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostLowMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostLowResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostMediumMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostMediumResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3CriticalMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3CriticalResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3HighMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3HighResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3LowMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3LowResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3MediumMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebVulnHostV3MediumResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebappVulnerableToSpring4ShellMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebappVulnerableToSpring4ShellResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsiteCopyrightExpiredMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsiteCopyrightExpiredResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsiteCopyrightUpToDateMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsiteCopyrightUpToDateResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsocketReceivesDataMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsocketReceivesDataResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsocketRequestsContainSensitiveFieldsMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsocketRequestsContainSensitiveFieldsResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsocketSendsDataMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesWebsocketSendsDataResponse200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXContentTypeOptionsIncorrectV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXContentTypeOptionsIncorrectV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXFrameOptionsIncorrectV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXFrameOptionsIncorrectV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXXssProtectionIncorrectV2MetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXXssProtectionIncorrectV2Response200, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXssPayloadUsingTorProxyDetectedMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsEffectiveDateIssuesXssPayloadUsingTorProxyDetectedResponse200, GetCompaniesScorecardIdentifierHistoryEventsMetadataParam, GetCompaniesScorecardIdentifierHistoryEventsResponse200, GetCompaniesScorecardIdentifierHistoryFactorsScoreMetadataParam, GetCompaniesScorecardIdentifierHistoryFactorsScoreResponse200, GetCompaniesScorecardIdentifierHistoryScoreMetadataParam, GetCompaniesScorecardIdentifierHistoryScoreResponse200, GetCompaniesScorecardIdentifierIssuesActiveCveExploitationAttemptedMetadataParam, GetCompaniesScorecardIdentifierIssuesActiveCveExploitationAttemptedResponse200, GetCompaniesScorecardIdentifierIssuesAdminSubdomainV2MetadataParam, GetCompaniesScorecardIdentifierIssuesAdminSubdomainV2Response200, GetCompaniesScorecardIdentifierIssuesAdwareInstallationMetadataParam, GetCompaniesScorecardIdentifierIssuesAdwareInstallationResponse200, GetCompaniesScorecardIdentifierIssuesAdwareInstallationTrailMetadataParam, GetCompaniesScorecardIdentifierIssuesAdwareInstallationTrailResponse200, GetCompaniesScorecardIdentifierIssuesAgeExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesAgeExposedResponse200, GetCompaniesScorecardIdentifierIssuesAllegedBreachIncidentMetadataParam, GetCompaniesScorecardIdentifierIssuesAllegedBreachIncidentResponse200, GetCompaniesScorecardIdentifierIssuesAnonymousProxyMetadataParam, GetCompaniesScorecardIdentifierIssuesAnonymousProxyResponse200, GetCompaniesScorecardIdentifierIssuesApiKeyExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesApiKeyExposedResponse200, GetCompaniesScorecardIdentifierIssuesAttackDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesAttackDetectedResponse200, GetCompaniesScorecardIdentifierIssuesAttemptedInformationLeakMetadataParam, GetCompaniesScorecardIdentifierIssuesAttemptedInformationLeakResponse200, GetCompaniesScorecardIdentifierIssuesBirthdayExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesBirthdayExposedResponse200, GetCompaniesScorecardIdentifierIssuesBitcoinServerMetadataParam, GetCompaniesScorecardIdentifierIssuesBitcoinServerResponse200, GetCompaniesScorecardIdentifierIssuesBrowserLogsContainDebugMessageMetadataParam, GetCompaniesScorecardIdentifierIssuesBrowserLogsContainDebugMessageResponse200, GetCompaniesScorecardIdentifierIssuesCdnHostingMetadataParam, GetCompaniesScorecardIdentifierIssuesCdnHostingResponse200, GetCompaniesScorecardIdentifierIssuesCleartextPasswordExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesCleartextPasswordExposedResponse200, GetCompaniesScorecardIdentifierIssuesCobaltStrikeC2DetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesCobaltStrikeC2DetectedResponse200, GetCompaniesScorecardIdentifierIssuesCobaltStrikeC2ServiceMetadataParam, GetCompaniesScorecardIdentifierIssuesCobaltStrikeC2ServiceResponse200, GetCompaniesScorecardIdentifierIssuesCommunicationServerWithExpiredCertMetadataParam, GetCompaniesScorecardIdentifierIssuesCommunicationServerWithExpiredCertResponse200, GetCompaniesScorecardIdentifierIssuesCommunicationWithServerCertificateIssuedByBlacklistedCountryMetadataParam, GetCompaniesScorecardIdentifierIssuesCommunicationWithServerCertificateIssuedByBlacklistedCountryResponse200, GetCompaniesScorecardIdentifierIssuesCompromisedByInformationStealerMetadataParam, GetCompaniesScorecardIdentifierIssuesCompromisedByInformationStealerResponse200, GetCompaniesScorecardIdentifierIssuesCompromisedCredentialsFoundMetadataParam, GetCompaniesScorecardIdentifierIssuesCompromisedCredentialsFoundResponse200, GetCompaniesScorecardIdentifierIssuesContactInformationDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesContactInformationDetectedResponse200, GetCompaniesScorecardIdentifierIssuesCookieMissingHttpOnlyMetadataParam, GetCompaniesScorecardIdentifierIssuesCookieMissingHttpOnlyResponse200, GetCompaniesScorecardIdentifierIssuesCookieMissingSecureAttributeMetadataParam, GetCompaniesScorecardIdentifierIssuesCookieMissingSecureAttributeResponse200, GetCompaniesScorecardIdentifierIssuesCspNoPolicyV2MetadataParam, GetCompaniesScorecardIdentifierIssuesCspNoPolicyV2Response200, GetCompaniesScorecardIdentifierIssuesCspTooBroadV2MetadataParam, GetCompaniesScorecardIdentifierIssuesCspTooBroadV2Response200, GetCompaniesScorecardIdentifierIssuesCspUnsafePolicyV2MetadataParam, GetCompaniesScorecardIdentifierIssuesCspUnsafePolicyV2Response200, GetCompaniesScorecardIdentifierIssuesCveInUseByThreatActorMetadataParam, GetCompaniesScorecardIdentifierIssuesCveInUseByThreatActorResponse200, GetCompaniesScorecardIdentifierIssuesDomainMissingHttpsV2MetadataParam, GetCompaniesScorecardIdentifierIssuesDomainMissingHttpsV2Response200, GetCompaniesScorecardIdentifierIssuesDosAttackAttemptDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesDosAttackAttemptDetectedResponse200, GetCompaniesScorecardIdentifierIssuesEmailExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesEmailExposedResponse200, GetCompaniesScorecardIdentifierIssuesEmployerExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesEmployerExposedResponse200, GetCompaniesScorecardIdentifierIssuesExploitAttemptDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesExploitAttemptDetectedResponse200, GetCompaniesScorecardIdentifierIssuesExploitedProductMetadataParam, GetCompaniesScorecardIdentifierIssuesExploitedProductResponse200, GetCompaniesScorecardIdentifierIssuesExposedCiscoWebUiMetadataParam, GetCompaniesScorecardIdentifierIssuesExposedCiscoWebUiResponse200, GetCompaniesScorecardIdentifierIssuesExposedEmbeddedIotWebServerMetadataParam, GetCompaniesScorecardIdentifierIssuesExposedEmbeddedIotWebServerResponse200, GetCompaniesScorecardIdentifierIssuesExposedIscsiDeviceMetadataParam, GetCompaniesScorecardIdentifierIssuesExposedIscsiDeviceResponse200, GetCompaniesScorecardIdentifierIssuesExposedMacAirportDeviceMetadataParam, GetCompaniesScorecardIdentifierIssuesExposedMacAirportDeviceResponse200, GetCompaniesScorecardIdentifierIssuesExposedMobilePrintingServiceMetadataParam, GetCompaniesScorecardIdentifierIssuesExposedMobilePrintingServiceResponse200, GetCompaniesScorecardIdentifierIssuesExposedNetworkAttachedStorageDeviceMetadataParam, GetCompaniesScorecardIdentifierIssuesExposedNetworkAttachedStorageDeviceResponse200, GetCompaniesScorecardIdentifierIssuesExposedPersonalInformationInfoMetadataParam, GetCompaniesScorecardIdentifierIssuesExposedPersonalInformationInfoResponse200, GetCompaniesScorecardIdentifierIssuesExposedPersonalInformationMetadataParam, GetCompaniesScorecardIdentifierIssuesExposedPersonalInformationResponse200, GetCompaniesScorecardIdentifierIssuesExposedPrinterMetadataParam, GetCompaniesScorecardIdentifierIssuesExposedPrinterResponse200, GetCompaniesScorecardIdentifierIssuesFailToLoadPageComponentsMetadataParam, GetCompaniesScorecardIdentifierIssuesFailToLoadPageComponentsResponse200, GetCompaniesScorecardIdentifierIssuesGeneralScanDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesGeneralScanDetectedResponse200, GetCompaniesScorecardIdentifierIssuesHashedPasswordExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesHashedPasswordExposedResponse200, GetCompaniesScorecardIdentifierIssuesHistoricalCompromisedCredentialsFoundMetadataParam, GetCompaniesScorecardIdentifierIssuesHistoricalCompromisedCredentialsFoundResponse200, GetCompaniesScorecardIdentifierIssuesHostedOnObjectStorageV2MetadataParam, GetCompaniesScorecardIdentifierIssuesHostedOnObjectStorageV2Response200, GetCompaniesScorecardIdentifierIssuesHstsIncorrectV2MetadataParam, GetCompaniesScorecardIdentifierIssuesHstsIncorrectV2Response200, GetCompaniesScorecardIdentifierIssuesIndustrialControlDeviceMetadataParam, GetCompaniesScorecardIdentifierIssuesIndustrialControlDeviceResponse200, GetCompaniesScorecardIdentifierIssuesInsecureFtpMetadataParam, GetCompaniesScorecardIdentifierIssuesInsecureFtpResponse200, GetCompaniesScorecardIdentifierIssuesInsecureHttpsRedirectPatternV2MetadataParam, GetCompaniesScorecardIdentifierIssuesInsecureHttpsRedirectPatternV2Response200, GetCompaniesScorecardIdentifierIssuesInsecureServerCertificateKeySizeMetadataParam, GetCompaniesScorecardIdentifierIssuesInsecureServerCertificateKeySizeResponse200, GetCompaniesScorecardIdentifierIssuesInsecureTelnetMetadataParam, GetCompaniesScorecardIdentifierIssuesInsecureTelnetResponse200, GetCompaniesScorecardIdentifierIssuesInstantMessagingAccountExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesInstantMessagingAccountExposedResponse200, GetCompaniesScorecardIdentifierIssuesIotCameraMetadataParam, GetCompaniesScorecardIdentifierIssuesIotCameraResponse200, GetCompaniesScorecardIdentifierIssuesIpAddressExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesIpAddressExposedResponse200, GetCompaniesScorecardIdentifierIssuesIpBlackListDueMaliciousActivityMetadataParam, GetCompaniesScorecardIdentifierIssuesIpBlackListDueMaliciousActivityResponse200, GetCompaniesScorecardIdentifierIssuesIssAccountLockoutThresholdEnabledMetadataParam, GetCompaniesScorecardIdentifierIssuesIssAccountLockoutThresholdEnabledResponse200, GetCompaniesScorecardIdentifierIssuesIssAdminServiceDownMetadataParam, GetCompaniesScorecardIdentifierIssuesIssAdminServiceDownResponse200, GetCompaniesScorecardIdentifierIssuesIssAllDeviceSensorPolicyAppliedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssAllDeviceSensorPolicyAppliedResponse200, GetCompaniesScorecardIdentifierIssuesIssCompletedVulnerabilityManagementScansMetadataParam, GetCompaniesScorecardIdentifierIssuesIssCompletedVulnerabilityManagementScansResponse200, GetCompaniesScorecardIdentifierIssuesIssDatabaseInstancesNotEncryptedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssDatabaseInstancesNotEncryptedResponse200, GetCompaniesScorecardIdentifierIssuesIssDetectedCveLinuxInstanceMetadataParam, GetCompaniesScorecardIdentifierIssuesIssDetectedCveLinuxInstanceResponse200, GetCompaniesScorecardIdentifierIssuesIssDetectedCveWindowsInstanceMetadataParam, GetCompaniesScorecardIdentifierIssuesIssDetectedCveWindowsInstanceResponse200, GetCompaniesScorecardIdentifierIssuesIssDetectedOsInCloudVmMetadataParam, GetCompaniesScorecardIdentifierIssuesIssDetectedOsInCloudVmResponse200, GetCompaniesScorecardIdentifierIssuesIssDetectedSoftwareInCloudVmMetadataParam, GetCompaniesScorecardIdentifierIssuesIssDetectedSoftwareInCloudVmResponse200, GetCompaniesScorecardIdentifierIssuesIssDeviceControlPolicyNotAppliedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssDeviceControlPolicyNotAppliedResponse200, GetCompaniesScorecardIdentifierIssuesIssDeviceFirewallPolicyNotAppliedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssDeviceFirewallPolicyNotAppliedResponse200, GetCompaniesScorecardIdentifierIssuesIssDevicePreventionPolicyNotAppliedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssDevicePreventionPolicyNotAppliedResponse200, GetCompaniesScorecardIdentifierIssuesIssDeviceRemoteResponsePolicyNotAppliedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssDeviceRemoteResponsePolicyNotAppliedResponse200, GetCompaniesScorecardIdentifierIssuesIssDeviceSensorUpdatePolicyNotAppliedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssDeviceSensorUpdatePolicyNotAppliedResponse200, GetCompaniesScorecardIdentifierIssuesIssDigitalFootprintHostnameMetadataParam, GetCompaniesScorecardIdentifierIssuesIssDigitalFootprintHostnameResponse200, GetCompaniesScorecardIdentifierIssuesIssDigitalFootprintIpMetadataParam, GetCompaniesScorecardIdentifierIssuesIssDigitalFootprintIpResponse200, GetCompaniesScorecardIdentifierIssuesIssEndpointSecurityProductDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssEndpointSecurityProductDetectedResponse200, GetCompaniesScorecardIdentifierIssuesIssEphemeralDisksNotEncryptedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssEphemeralDisksNotEncryptedResponse200, GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsGoodZtcAuditScoresMetadataParam, GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsGoodZtcAuditScoresResponse200, GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsLowZtcAuditScoresMetadataParam, GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsLowZtcAuditScoresResponse200, GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsMediumZtcAuditScoresMetadataParam, GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsMediumZtcAuditScoresResponse200, GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsVeryLowZtcAuditScoresMetadataParam, GetCompaniesScorecardIdentifierIssuesIssFactorsSettingsVeryLowZtcAuditScoresResponse200, GetCompaniesScorecardIdentifierIssuesIssFailed2FaAuthenticationMetadataParam, GetCompaniesScorecardIdentifierIssuesIssFailed2FaAuthenticationResponse200, GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusPresentMetadataParam, GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusPresentResponse200, GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusServiceExpiredMetadataParam, GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusServiceExpiredResponse200, GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusServiceNotValidMetadataParam, GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusServiceNotValidResponse200, GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusServiceValidMetadataParam, GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusServiceValidResponse200, GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusSignaturesOutOfDateMetadataParam, GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusSignaturesOutOfDateResponse200, GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusSignaturesUpdatedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssGatewayAntivirusSignaturesUpdatedResponse200, GetCompaniesScorecardIdentifierIssuesIssGoodOverallZtcAuditScoreMetadataParam, GetCompaniesScorecardIdentifierIssuesIssGoodOverallZtcAuditScoreResponse200, GetCompaniesScorecardIdentifierIssuesIssHostBasedFirewallPresentMetadataParam, GetCompaniesScorecardIdentifierIssuesIssHostBasedFirewallPresentResponse200, GetCompaniesScorecardIdentifierIssuesIssHostVulnerableToCveDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssHostVulnerableToCveDetectedResponse200, GetCompaniesScorecardIdentifierIssuesIssHttpAntivirusScanEnabledMetadataParam, GetCompaniesScorecardIdentifierIssuesIssHttpAntivirusScanEnabledResponse200, GetCompaniesScorecardIdentifierIssuesIssIncidentClosedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssIncidentClosedResponse200, GetCompaniesScorecardIdentifierIssuesIssIncidentDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssIncidentDetectedResponse200, GetCompaniesScorecardIdentifierIssuesIssLowAverageOverallZtcAuditScoreMetadataParam, GetCompaniesScorecardIdentifierIssuesIssLowAverageOverallZtcAuditScoreResponse200, GetCompaniesScorecardIdentifierIssuesIssMediumOverallZtcAuditScoreMetadataParam, GetCompaniesScorecardIdentifierIssuesIssMediumOverallZtcAuditScoreResponse200, GetCompaniesScorecardIdentifierIssuesIssObjectStorageBucketsAllowPublicAccessMetadataParam, GetCompaniesScorecardIdentifierIssuesIssObjectStorageBucketsAllowPublicAccessResponse200, GetCompaniesScorecardIdentifierIssuesIssObjectStorageBucketsNotEncryptedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssObjectStorageBucketsNotEncryptedResponse200, GetCompaniesScorecardIdentifierIssuesIssOsSettingsNotMeetZeroTrustRequirementsMetadataParam, GetCompaniesScorecardIdentifierIssuesIssOsSettingsNotMeetZeroTrustRequirementsResponse200, GetCompaniesScorecardIdentifierIssuesIssOutOfDateEndpointSecurityMetadataParam, GetCompaniesScorecardIdentifierIssuesIssOutOfDateEndpointSecurityResponse200, GetCompaniesScorecardIdentifierIssuesIssOutOfDateFirmwareMetadataParam, GetCompaniesScorecardIdentifierIssuesIssOutOfDateFirmwareResponse200, GetCompaniesScorecardIdentifierIssuesIssOutOfDateOperatingSystemMetadataParam, GetCompaniesScorecardIdentifierIssuesIssOutOfDateOperatingSystemResponse200, GetCompaniesScorecardIdentifierIssuesIssPasswordPolicyAllowsReuseMetadataParam, GetCompaniesScorecardIdentifierIssuesIssPasswordPolicyAllowsReuseResponse200, GetCompaniesScorecardIdentifierIssuesIssPasswordPolicyNoRegularUpdatesMetadataParam, GetCompaniesScorecardIdentifierIssuesIssPasswordPolicyNoRegularUpdatesResponse200, GetCompaniesScorecardIdentifierIssuesIssPersistentDisksNotEncryptedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssPersistentDisksNotEncryptedResponse200, GetCompaniesScorecardIdentifierIssuesIssQueuesEncryptedWithProviderManagedKeyMetadataParam, GetCompaniesScorecardIdentifierIssuesIssQueuesEncryptedWithProviderManagedKeyResponse200, GetCompaniesScorecardIdentifierIssuesIssQueuesNotEncryptedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssQueuesNotEncryptedResponse200, GetCompaniesScorecardIdentifierIssuesIssRootAccountHasAccessKeysMetadataParam, GetCompaniesScorecardIdentifierIssuesIssRootAccountHasAccessKeysResponse200, GetCompaniesScorecardIdentifierIssuesIssRootAccountWithoutMfaEnabledMetadataParam, GetCompaniesScorecardIdentifierIssuesIssRootAccountWithoutMfaEnabledResponse200, GetCompaniesScorecardIdentifierIssuesIssSensorPoliciesNotMeetZeroTrustRequirementsMetadataParam, GetCompaniesScorecardIdentifierIssuesIssSensorPoliciesNotMeetZeroTrustRequirementsResponse200, GetCompaniesScorecardIdentifierIssuesIssStrongMinimumPasswordLengthSetMetadataParam, GetCompaniesScorecardIdentifierIssuesIssStrongMinimumPasswordLengthSetResponse200, GetCompaniesScorecardIdentifierIssuesIssThreatDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssThreatDetectedResponse200, GetCompaniesScorecardIdentifierIssuesIssThreatRemediatedMetadataParam, GetCompaniesScorecardIdentifierIssuesIssThreatRemediatedResponse200, GetCompaniesScorecardIdentifierIssuesIssUsersWithAccessKeysNotRotatedRegularlyMetadataParam, GetCompaniesScorecardIdentifierIssuesIssUsersWithAccessKeysNotRotatedRegularlyResponse200, GetCompaniesScorecardIdentifierIssuesIssUsersWithPasswordsNotRotatedRegularlyMetadataParam, GetCompaniesScorecardIdentifierIssuesIssUsersWithPasswordsNotRotatedRegularlyResponse200, GetCompaniesScorecardIdentifierIssuesIssUsersWithUnusedAccessKeysMetadataParam, GetCompaniesScorecardIdentifierIssuesIssUsersWithUnusedAccessKeysResponse200, GetCompaniesScorecardIdentifierIssuesIssUsersWithUnusedPasswordsMetadataParam, GetCompaniesScorecardIdentifierIssuesIssUsersWithUnusedPasswordsResponse200, GetCompaniesScorecardIdentifierIssuesIssVeryLowOverallZtcAuditScoreMetadataParam, GetCompaniesScorecardIdentifierIssuesIssVeryLowOverallZtcAuditScoreResponse200, GetCompaniesScorecardIdentifierIssuesJavaDebuggerMetadataParam, GetCompaniesScorecardIdentifierIssuesJavaDebuggerResponse200, GetCompaniesScorecardIdentifierIssuesKnownCompromisedOrHostileHostMetadataParam, GetCompaniesScorecardIdentifierIssuesKnownCompromisedOrHostileHostResponse200, GetCompaniesScorecardIdentifierIssuesLanguageExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesLanguageExposedResponse200, GetCompaniesScorecardIdentifierIssuesLeakedCredentialsInfoMetadataParam, GetCompaniesScorecardIdentifierIssuesLeakedCredentialsInfoResponse200, GetCompaniesScorecardIdentifierIssuesLeakedCredentialsMetadataParam, GetCompaniesScorecardIdentifierIssuesLeakedCredentialsResponse200, GetCompaniesScorecardIdentifierIssuesLinksToInsecureWebsiteMetadataParam, GetCompaniesScorecardIdentifierIssuesLinksToInsecureWebsiteResponse200, GetCompaniesScorecardIdentifierIssuesLocalFilePathExposedViaUrlSchemeMetadataParam, GetCompaniesScorecardIdentifierIssuesLocalFilePathExposedViaUrlSchemeResponse200, GetCompaniesScorecardIdentifierIssuesMailServerUnusualPortMetadataParam, GetCompaniesScorecardIdentifierIssuesMailServerUnusualPortResponse200, GetCompaniesScorecardIdentifierIssuesMaliciousBotnetCAndCServerDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesMaliciousBotnetCAndCServerDetectedResponse200, GetCompaniesScorecardIdentifierIssuesMaliciousScanDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesMaliciousScanDetectedResponse200, GetCompaniesScorecardIdentifierIssuesMaliciousTorExitNodeDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesMaliciousTorExitNodeDetectedResponse200, GetCompaniesScorecardIdentifierIssuesMaliciousTorRelayRouterNodeDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesMaliciousTorRelayRouterNodeDetectedResponse200, GetCompaniesScorecardIdentifierIssuesMaliciousUserAgentDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesMaliciousUserAgentDetectedResponse200, GetCompaniesScorecardIdentifierIssuesMalwareControllerMetadataParam, GetCompaniesScorecardIdentifierIssuesMalwareControllerResponse200, GetCompaniesScorecardIdentifierIssuesMalwareDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesMalwareDetectedResponse200, GetCompaniesScorecardIdentifierIssuesMalwareInfectionMetadataParam, GetCompaniesScorecardIdentifierIssuesMalwareInfectionResponse200, GetCompaniesScorecardIdentifierIssuesMalwareInfectionTrailMetadataParam, GetCompaniesScorecardIdentifierIssuesMalwareInfectionTrailResponse200, GetCompaniesScorecardIdentifierIssuesMicrosoftExchange0DayVulnerabilityMetadataParam, GetCompaniesScorecardIdentifierIssuesMicrosoftExchange0DayVulnerabilityResponse200, GetCompaniesScorecardIdentifierIssuesMicrosoftExchangeHttpApiVulnerabilityMetadataParam, GetCompaniesScorecardIdentifierIssuesMicrosoftExchangeHttpApiVulnerabilityResponse200, GetCompaniesScorecardIdentifierIssuesMinecraftServerMetadataParam, GetCompaniesScorecardIdentifierIssuesMinecraftServerResponse200, GetCompaniesScorecardIdentifierIssuesMiraiBotnetTrafficDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesMiraiBotnetTrafficDetectedResponse200, GetCompaniesScorecardIdentifierIssuesMysqlServerEmptyPasswordMetadataParam, GetCompaniesScorecardIdentifierIssuesMysqlServerEmptyPasswordResponse200, GetCompaniesScorecardIdentifierIssuesNameExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesNameExposedResponse200, GetCompaniesScorecardIdentifierIssuesNonSocialMediaAccessTokenExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesNonSocialMediaAccessTokenExposedResponse200, GetCompaniesScorecardIdentifierIssuesOccupationExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesOccupationExposedResponse200, GetCompaniesScorecardIdentifierIssuesOpenPortMetadataParam, GetCompaniesScorecardIdentifierIssuesOpenPortResponse200, GetCompaniesScorecardIdentifierIssuesOpensslCriticalVulnerabilityMetadataParam, GetCompaniesScorecardIdentifierIssuesOpensslCriticalVulnerabilityResponse200, GetCompaniesScorecardIdentifierIssuesOutdatedBrowserDomainMetadataParam, GetCompaniesScorecardIdentifierIssuesOutdatedBrowserDomainResponse200, GetCompaniesScorecardIdentifierIssuesOutdatedBrowserMetadataParam, GetCompaniesScorecardIdentifierIssuesOutdatedBrowserResponse200, GetCompaniesScorecardIdentifierIssuesOutdatedOsDomainMetadataParam, GetCompaniesScorecardIdentifierIssuesOutdatedOsDomainResponse200, GetCompaniesScorecardIdentifierIssuesOutdatedOsMetadataParam, GetCompaniesScorecardIdentifierIssuesOutdatedOsResponse200, GetCompaniesScorecardIdentifierIssuesParentsNameExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesParentsNameExposedResponse200, GetCompaniesScorecardIdentifierIssuesPasswordExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesPasswordExposedResponse200, GetCompaniesScorecardIdentifierIssuesPasswordHintExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesPasswordHintExposedResponse200, GetCompaniesScorecardIdentifierIssuesPatchingAnalysisHighMetadataParam, GetCompaniesScorecardIdentifierIssuesPatchingAnalysisHighResponse200, GetCompaniesScorecardIdentifierIssuesPatchingAnalysisLowMetadataParam, GetCompaniesScorecardIdentifierIssuesPatchingAnalysisLowResponse200, GetCompaniesScorecardIdentifierIssuesPatchingAnalysisMediumMetadataParam, GetCompaniesScorecardIdentifierIssuesPatchingAnalysisMediumResponse200, GetCompaniesScorecardIdentifierIssuesPatchingCadenceCriticalMetadataParam, GetCompaniesScorecardIdentifierIssuesPatchingCadenceCriticalResponse200, GetCompaniesScorecardIdentifierIssuesPatchingCadenceHighMetadataParam, GetCompaniesScorecardIdentifierIssuesPatchingCadenceHighResponse200, GetCompaniesScorecardIdentifierIssuesPatchingCadenceInfoMetadataParam, GetCompaniesScorecardIdentifierIssuesPatchingCadenceInfoResponse200, GetCompaniesScorecardIdentifierIssuesPatchingCadenceLowMetadataParam, GetCompaniesScorecardIdentifierIssuesPatchingCadenceLowResponse200, GetCompaniesScorecardIdentifierIssuesPatchingCadenceMediumMetadataParam, GetCompaniesScorecardIdentifierIssuesPatchingCadenceMediumResponse200, GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3CriticalMetadataParam, GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3CriticalResponse200, GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3HighMetadataParam, GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3HighResponse200, GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3LowMetadataParam, GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3LowResponse200, GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3MediumMetadataParam, GetCompaniesScorecardIdentifierIssuesPatchingCadenceV3MediumResponse200, GetCompaniesScorecardIdentifierIssuesPaymentProviderMetadataParam, GetCompaniesScorecardIdentifierIssuesPaymentProviderResponse200, GetCompaniesScorecardIdentifierIssuesPhishingMetadataParam, GetCompaniesScorecardIdentifierIssuesPhishingResponse200, GetCompaniesScorecardIdentifierIssuesPhoneNumberExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesPhoneNumberExposedResponse200, GetCompaniesScorecardIdentifierIssuesPhysicalAddressExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesPhysicalAddressExposedResponse200, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCiscoRv320325MetadataParam, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCiscoRv320325Response200, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202333246MetadataParam, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202333246Response200, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202334362MetadataParam, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202334362Response200, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve20233519MetadataParam, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve20233519Response200, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202337582MetadataParam, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202337582Response200, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202337979MetadataParam, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202337979Response200, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202338035MetadataParam, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202338035Response200, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202346747MetadataParam, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202346747Response200, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202421887MetadataParam, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202421887Response200, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202446805MetadataParam, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableCve202446805Response200, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableMetadataParam, GetCompaniesScorecardIdentifierIssuesPotentiallyVulnerableResponse200, GetCompaniesScorecardIdentifierIssuesProductExploitedByRansomwareActorsMetadataParam, GetCompaniesScorecardIdentifierIssuesProductExploitedByRansomwareActorsResponse200, GetCompaniesScorecardIdentifierIssuesProductUsesVulnerableLog4JMetadataParam, GetCompaniesScorecardIdentifierIssuesProductUsesVulnerableLog4JResponse200, GetCompaniesScorecardIdentifierIssuesPvaInstallationMetadataParam, GetCompaniesScorecardIdentifierIssuesPvaInstallationResponse200, GetCompaniesScorecardIdentifierIssuesPvaInstallationTrailMetadataParam, GetCompaniesScorecardIdentifierIssuesPvaInstallationTrailResponse200, GetCompaniesScorecardIdentifierIssuesRaceExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesRaceExposedResponse200, GetCompaniesScorecardIdentifierIssuesRansomwareAssociationMetadataParam, GetCompaniesScorecardIdentifierIssuesRansomwareAssociationResponse200, GetCompaniesScorecardIdentifierIssuesRansomwareInfectionMetadataParam, GetCompaniesScorecardIdentifierIssuesRansomwareInfectionResponse200, GetCompaniesScorecardIdentifierIssuesRansomwareInfectionTrailMetadataParam, GetCompaniesScorecardIdentifierIssuesRansomwareInfectionTrailResponse200, GetCompaniesScorecardIdentifierIssuesRansomwareVictimMetadataParam, GetCompaniesScorecardIdentifierIssuesRansomwareVictimResponse200, GetCompaniesScorecardIdentifierIssuesRedirectChainContainsHttpV2MetadataParam, GetCompaniesScorecardIdentifierIssuesRedirectChainContainsHttpV2Response200, GetCompaniesScorecardIdentifierIssuesRedirectToInsecureWebsiteMetadataParam, GetCompaniesScorecardIdentifierIssuesRedirectToInsecureWebsiteResponse200, GetCompaniesScorecardIdentifierIssuesReferencesObjectStorageV2MetadataParam, GetCompaniesScorecardIdentifierIssuesReferencesObjectStorageV2Response200, GetCompaniesScorecardIdentifierIssuesRemoteAccessMetadataParam, GetCompaniesScorecardIdentifierIssuesRemoteAccessResponse200, GetCompaniesScorecardIdentifierIssuesSecurityQuestionAndAnswerExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesSecurityQuestionAndAnswerExposedResponse200, GetCompaniesScorecardIdentifierIssuesSensitiveDataExposureThroughInsecureChannelMetadataParam, GetCompaniesScorecardIdentifierIssuesSensitiveDataExposureThroughInsecureChannelResponse200, GetCompaniesScorecardIdentifierIssuesServerErrorMetadataParam, GetCompaniesScorecardIdentifierIssuesServerErrorResponse200, GetCompaniesScorecardIdentifierIssuesServiceCassandraMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceCassandraResponse200, GetCompaniesScorecardIdentifierIssuesServiceCloudProviderMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceCloudProviderResponse200, GetCompaniesScorecardIdentifierIssuesServiceCouchdbMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceCouchdbResponse200, GetCompaniesScorecardIdentifierIssuesServiceDnsMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceDnsResponse200, GetCompaniesScorecardIdentifierIssuesServiceElasticsearchMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceElasticsearchResponse200, GetCompaniesScorecardIdentifierIssuesServiceEndOfLifeMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceEndOfLifeResponse200, GetCompaniesScorecardIdentifierIssuesServiceEndOfServiceMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceEndOfServiceResponse200, GetCompaniesScorecardIdentifierIssuesServiceFtpMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceFtpResponse200, GetCompaniesScorecardIdentifierIssuesServiceHttpProxyMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceHttpProxyResponse200, GetCompaniesScorecardIdentifierIssuesServiceImapMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceImapResponse200, GetCompaniesScorecardIdentifierIssuesServiceLdapAnonymousMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceLdapAnonymousResponse200, GetCompaniesScorecardIdentifierIssuesServiceLdapMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceLdapResponse200, GetCompaniesScorecardIdentifierIssuesServiceMicrosoftSqlMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceMicrosoftSqlResponse200, GetCompaniesScorecardIdentifierIssuesServiceMongodbMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceMongodbResponse200, GetCompaniesScorecardIdentifierIssuesServiceMysqlMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceMysqlResponse200, GetCompaniesScorecardIdentifierIssuesServiceNeo4JMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceNeo4JResponse200, GetCompaniesScorecardIdentifierIssuesServiceNetbusRemoteAccessMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceNetbusRemoteAccessResponse200, GetCompaniesScorecardIdentifierIssuesServiceNetworkingMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceNetworkingResponse200, GetCompaniesScorecardIdentifierIssuesServiceOpenVpnMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceOpenVpnResponse200, GetCompaniesScorecardIdentifierIssuesServiceOracleDbMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceOracleDbResponse200, GetCompaniesScorecardIdentifierIssuesServiceOracleRegistryMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceOracleRegistryResponse200, GetCompaniesScorecardIdentifierIssuesServicePop3MetadataParam, GetCompaniesScorecardIdentifierIssuesServicePop3Response200, GetCompaniesScorecardIdentifierIssuesServicePostgresqlMetadataParam, GetCompaniesScorecardIdentifierIssuesServicePostgresqlResponse200, GetCompaniesScorecardIdentifierIssuesServicePptpMetadataParam, GetCompaniesScorecardIdentifierIssuesServicePptpResponse200, GetCompaniesScorecardIdentifierIssuesServicePulseVpnMetadataParam, GetCompaniesScorecardIdentifierIssuesServicePulseVpnResponse200, GetCompaniesScorecardIdentifierIssuesServiceRdpMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceRdpResponse200, GetCompaniesScorecardIdentifierIssuesServiceRedisMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceRedisResponse200, GetCompaniesScorecardIdentifierIssuesServiceRsyncMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceRsyncResponse200, GetCompaniesScorecardIdentifierIssuesServiceSmbMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceSmbResponse200, GetCompaniesScorecardIdentifierIssuesServiceSoapMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceSoapResponse200, GetCompaniesScorecardIdentifierIssuesServiceSocksProxyMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceSocksProxyResponse200, GetCompaniesScorecardIdentifierIssuesServiceTelnetMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceTelnetResponse200, GetCompaniesScorecardIdentifierIssuesServiceVncMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceVncResponse200, GetCompaniesScorecardIdentifierIssuesServiceVulnHostCriticalMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceVulnHostCriticalResponse200, GetCompaniesScorecardIdentifierIssuesServiceVulnHostHighMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceVulnHostHighResponse200, GetCompaniesScorecardIdentifierIssuesServiceVulnHostInfoMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceVulnHostInfoResponse200, GetCompaniesScorecardIdentifierIssuesServiceVulnHostLowMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceVulnHostLowResponse200, GetCompaniesScorecardIdentifierIssuesServiceVulnHostMediumMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceVulnHostMediumResponse200, GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3CriticalMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3CriticalResponse200, GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3HighMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3HighResponse200, GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3LowMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3LowResponse200, GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3MediumMetadataParam, GetCompaniesScorecardIdentifierIssuesServiceVulnHostV3MediumResponse200, GetCompaniesScorecardIdentifierIssuesSiteEmitsBrowserLogMetadataParam, GetCompaniesScorecardIdentifierIssuesSiteEmitsBrowserLogResponse200, GetCompaniesScorecardIdentifierIssuesSiteRequestsDataOverInsecureChannelMetadataParam, GetCompaniesScorecardIdentifierIssuesSiteRequestsDataOverInsecureChannelResponse200, GetCompaniesScorecardIdentifierIssuesSiteUsesHstsPreloadingV2MetadataParam, GetCompaniesScorecardIdentifierIssuesSiteUsesHstsPreloadingV2Response200, GetCompaniesScorecardIdentifierIssuesSocialMediaAccountExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesSocialMediaAccountExposedResponse200, GetCompaniesScorecardIdentifierIssuesSocialMediaTokenExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesSocialMediaTokenExposedResponse200, GetCompaniesScorecardIdentifierIssuesSocialSecurityNumberExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesSocialSecurityNumberExposedResponse200, GetCompaniesScorecardIdentifierIssuesSpaBrowserMetadataParam, GetCompaniesScorecardIdentifierIssuesSpaBrowserResponse200, GetCompaniesScorecardIdentifierIssuesSpfRecordMalformedMetadataParam, GetCompaniesScorecardIdentifierIssuesSpfRecordMalformedResponse200, GetCompaniesScorecardIdentifierIssuesSpfRecordMissingMetadataParam, GetCompaniesScorecardIdentifierIssuesSpfRecordMissingResponse200, GetCompaniesScorecardIdentifierIssuesSpfRecordSoftfailMetadataParam, GetCompaniesScorecardIdentifierIssuesSpfRecordSoftfailResponse200, GetCompaniesScorecardIdentifierIssuesSpfRecordWildcardMetadataParam, GetCompaniesScorecardIdentifierIssuesSpfRecordWildcardResponse200, GetCompaniesScorecardIdentifierIssuesSqlPayloadUsingTorProxyDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesSqlPayloadUsingTorProxyDetectedResponse200, GetCompaniesScorecardIdentifierIssuesSshWeakCipherMetadataParam, GetCompaniesScorecardIdentifierIssuesSshWeakCipherResponse200, GetCompaniesScorecardIdentifierIssuesSshWeakMacMetadataParam, GetCompaniesScorecardIdentifierIssuesSshWeakMacResponse200, GetCompaniesScorecardIdentifierIssuesSshWeakProtocolMetadataParam, GetCompaniesScorecardIdentifierIssuesSshWeakProtocolResponse200, GetCompaniesScorecardIdentifierIssuesSuspiciousTrafficMetadataParam, GetCompaniesScorecardIdentifierIssuesSuspiciousTrafficResponse200, GetCompaniesScorecardIdentifierIssuesTelephonyMetadataParam, GetCompaniesScorecardIdentifierIssuesTelephonyResponse200, GetCompaniesScorecardIdentifierIssuesThreatActorHostingInfrastructureMetadataParam, GetCompaniesScorecardIdentifierIssuesThreatActorHostingInfrastructureResponse200, GetCompaniesScorecardIdentifierIssuesTlsOcspStaplingMetadataParam, GetCompaniesScorecardIdentifierIssuesTlsOcspStaplingResponse200, GetCompaniesScorecardIdentifierIssuesTlsWeakCipherMetadataParam, GetCompaniesScorecardIdentifierIssuesTlsWeakCipherResponse200, GetCompaniesScorecardIdentifierIssuesTlsWeakProtocolMetadataParam, GetCompaniesScorecardIdentifierIssuesTlsWeakProtocolResponse200, GetCompaniesScorecardIdentifierIssuesTlscertExcessiveExpirationMetadataParam, GetCompaniesScorecardIdentifierIssuesTlscertExcessiveExpirationResponse200, GetCompaniesScorecardIdentifierIssuesTlscertExpiredMetadataParam, GetCompaniesScorecardIdentifierIssuesTlscertExpiredResponse200, GetCompaniesScorecardIdentifierIssuesTlscertNoRevocationMetadataParam, GetCompaniesScorecardIdentifierIssuesTlscertNoRevocationResponse200, GetCompaniesScorecardIdentifierIssuesTlscertRevokedMetadataParam, GetCompaniesScorecardIdentifierIssuesTlscertRevokedResponse200, GetCompaniesScorecardIdentifierIssuesTlscertSelfSignedMetadataParam, GetCompaniesScorecardIdentifierIssuesTlscertSelfSignedResponse200, GetCompaniesScorecardIdentifierIssuesTlscertWeakSignatureMetadataParam, GetCompaniesScorecardIdentifierIssuesTlscertWeakSignatureResponse200, GetCompaniesScorecardIdentifierIssuesTorServerMetadataParam, GetCompaniesScorecardIdentifierIssuesTorServerResponse200, GetCompaniesScorecardIdentifierIssuesTorTrafficDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesTorTrafficDetectedResponse200, GetCompaniesScorecardIdentifierIssuesTyposquatMetadataParam, GetCompaniesScorecardIdentifierIssuesTyposquatResponse200, GetCompaniesScorecardIdentifierIssuesUceMetadataParam, GetCompaniesScorecardIdentifierIssuesUceResponse200, GetCompaniesScorecardIdentifierIssuesUnsafeSriV2MetadataParam, GetCompaniesScorecardIdentifierIssuesUnsafeSriV2Response200, GetCompaniesScorecardIdentifierIssuesUpnpAccessibleMetadataParam, GetCompaniesScorecardIdentifierIssuesUpnpAccessibleResponse200, GetCompaniesScorecardIdentifierIssuesUserAgentStringExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesUserAgentStringExposedResponse200, GetCompaniesScorecardIdentifierIssuesUsernameExposedMetadataParam, GetCompaniesScorecardIdentifierIssuesUsernameExposedResponse200, GetCompaniesScorecardIdentifierIssuesUsesGoDaddyInfrastructureMetadataParam, GetCompaniesScorecardIdentifierIssuesUsesGoDaddyInfrastructureResponse200, GetCompaniesScorecardIdentifierIssuesUsesGoDaddyManagedWordpressMetadataParam, GetCompaniesScorecardIdentifierIssuesUsesGoDaddyManagedWordpressResponse200, GetCompaniesScorecardIdentifierIssuesUsesLog4JMetadataParam, GetCompaniesScorecardIdentifierIssuesUsesLog4JResponse200, GetCompaniesScorecardIdentifierIssuesWafDetectedV2MetadataParam, GetCompaniesScorecardIdentifierIssuesWafDetectedV2Response200, GetCompaniesScorecardIdentifierIssuesWebVulnHostCriticalMetadataParam, GetCompaniesScorecardIdentifierIssuesWebVulnHostCriticalResponse200, GetCompaniesScorecardIdentifierIssuesWebVulnHostHighMetadataParam, GetCompaniesScorecardIdentifierIssuesWebVulnHostHighResponse200, GetCompaniesScorecardIdentifierIssuesWebVulnHostLowMetadataParam, GetCompaniesScorecardIdentifierIssuesWebVulnHostLowResponse200, GetCompaniesScorecardIdentifierIssuesWebVulnHostMediumMetadataParam, GetCompaniesScorecardIdentifierIssuesWebVulnHostMediumResponse200, GetCompaniesScorecardIdentifierIssuesWebVulnHostV3CriticalMetadataParam, GetCompaniesScorecardIdentifierIssuesWebVulnHostV3CriticalResponse200, GetCompaniesScorecardIdentifierIssuesWebVulnHostV3HighMetadataParam, GetCompaniesScorecardIdentifierIssuesWebVulnHostV3HighResponse200, GetCompaniesScorecardIdentifierIssuesWebVulnHostV3LowMetadataParam, GetCompaniesScorecardIdentifierIssuesWebVulnHostV3LowResponse200, GetCompaniesScorecardIdentifierIssuesWebVulnHostV3MediumMetadataParam, GetCompaniesScorecardIdentifierIssuesWebVulnHostV3MediumResponse200, GetCompaniesScorecardIdentifierIssuesWebappVulnerableToSpring4ShellMetadataParam, GetCompaniesScorecardIdentifierIssuesWebappVulnerableToSpring4ShellResponse200, GetCompaniesScorecardIdentifierIssuesWebsiteCopyrightExpiredMetadataParam, GetCompaniesScorecardIdentifierIssuesWebsiteCopyrightExpiredResponse200, GetCompaniesScorecardIdentifierIssuesWebsiteCopyrightUpToDateMetadataParam, GetCompaniesScorecardIdentifierIssuesWebsiteCopyrightUpToDateResponse200, GetCompaniesScorecardIdentifierIssuesWebsocketReceivesDataMetadataParam, GetCompaniesScorecardIdentifierIssuesWebsocketReceivesDataResponse200, GetCompaniesScorecardIdentifierIssuesWebsocketRequestsContainSensitiveFieldsMetadataParam, GetCompaniesScorecardIdentifierIssuesWebsocketRequestsContainSensitiveFieldsResponse200, GetCompaniesScorecardIdentifierIssuesWebsocketSendsDataMetadataParam, GetCompaniesScorecardIdentifierIssuesWebsocketSendsDataResponse200, GetCompaniesScorecardIdentifierIssuesXContentTypeOptionsIncorrectV2MetadataParam, GetCompaniesScorecardIdentifierIssuesXContentTypeOptionsIncorrectV2Response200, GetCompaniesScorecardIdentifierIssuesXFrameOptionsIncorrectV2MetadataParam, GetCompaniesScorecardIdentifierIssuesXFrameOptionsIncorrectV2Response200, GetCompaniesScorecardIdentifierIssuesXXssProtectionIncorrectV2MetadataParam, GetCompaniesScorecardIdentifierIssuesXXssProtectionIncorrectV2Response200, GetCompaniesScorecardIdentifierIssuesXssPayloadUsingTorProxyDetectedMetadataParam, GetCompaniesScorecardIdentifierIssuesXssPayloadUsingTorProxyDetectedResponse200, GetCompaniesScorecardIdentifierMetadataParam, GetCompaniesScorecardIdentifierResponse200, GetCompaniesScorecardIdentifierResponse400, GetCompaniesScorecardIdentifierResponse401, GetCompaniesScorecardIdentifierResponse403, GetCompaniesScorecardIdentifierResponse404, GetCompaniesScorecardIdentifierResponse429, GetComplianceFrameworksKeyMetadataParam, GetComplianceFrameworksKeyResponse200, GetComplianceFrameworksResponse200, GetCustomScorecardsIdMetadataParam, GetIndustriesIndustryFactorsMetadataParam, GetIndustriesIndustryFactorsResponse200, GetIndustriesIndustryHistoryFactorsMetadataParam, GetIndustriesIndustryHistoryFactorsResponse200, GetIndustriesIndustryHistoryScoreMetadataParam, GetIndustriesIndustryHistoryScoreResponse200, GetIndustriesIndustryScoreMetadataParam, GetIndustriesIndustryScoreResponse200, GetMetadataFactorsResponse200, GetMetadataIssueTypesResponse200, GetMetadataIssueTypesTypeMetadataParam, GetMetadataIssueTypesTypeResponse200, GetPlansByIdMetadataParam, GetPlansByIdResponse200, GetPlansMetadataParam, GetPlansResponse200, GetPortfoliosPortfolioIdCompaniesMetadataParam, GetPortfoliosPortfolioIdCompaniesResponse200, GetPortfoliosPortfolioIdExpandedRiskMetadataParam, GetPortfoliosPortfolioIdExpandedRiskResponse200, GetPortfoliosPortfolioIdExpandedRiskResponseDefault, GetPortfoliosResponse200, GetReportsFilesFilePathMetadataParam, GetReportsRecentResponse200, GetScorecardTagsGroupsIdMetadataParam, GetScorecardTagsGroupsIdResponse200, GetScorecardTagsGroupsResponse200, GetScorecardTagsIdCompaniesMetadataParam, GetScorecardTagsIdCompaniesResponse200, GetScorecardTagsResponse200, GetUsersByUsernameUsernameNotificationsRecentMetadataParam, GetUsersByUsernameUsernameNotificationsRecentResponse200, GetVendorDetectionDomainFourthPartyMetadataParam, GetVendorDetectionDomainFourthPartyResponse200, GetVendorDetectionDomainFourthPartyResponseDefault, GetVendorDetectionDomainProductsMetadataParam, GetVendorDetectionDomainProductsResponse200, GetVendorDetectionDomainProductsResponseDefault, GetVendorDetectionDomainRiskMetadataParam, GetVendorDetectionDomainRiskResponse200, GetVendorDetectionDomainRiskResponseDefault, GetVendorDetectionDomainThirdPartyMetadataParam, GetVendorDetectionDomainThirdPartyResponse200, GetVendorDetectionDomainThirdPartyResponseDefault, GetVendorDetectionPortfoliosPortfolioidMetadataParam, GetVendorDetectionPortfoliosPortfolioidResponse200, GetVendorDetectionPortfoliosPortfolioidResponseDefault, PatchCustomScorecardsIdFiltersBodyParam, PatchCustomScorecardsIdFiltersMetadataParam, PatchCustomScorecardsIdFiltersResponse200, PatchCustomScorecardsIdSourcesBodyParam, PatchCustomScorecardsIdSourcesMetadataParam, PatchCustomScorecardsIdSourcesResponse200, PatchPlansFactorScoreImprovementByIdBodyParam, PatchPlansFactorScoreImprovementByIdMetadataParam, PatchPlansIssueResolutionByIdBodyParam, PatchPlansIssueResolutionByIdMetadataParam, PatchPlansOverallScoreImprovementByIdBodyParam, PatchPlansOverallScoreImprovementByIdMetadataParam, PostApiBodyParam, PostApiByParentdomainDomainByDomainAssociateTagsByTagidBodyParam, PostApiByParentdomainDomainByDomainAssociateTagsByTagidMetadataParam, PostApiByParentdomainDomainByDomainAssociateTagsByTagidResponse200, PostApiByParentdomainIpByIpAssociateTagsByTagidBodyParam, PostApiByParentdomainIpByIpAssociateTagsByTagidMetadataParam, PostApiByParentdomainIpByIpAssociateTagsByTagidResponse200, PostApiGroupsByTaggroupidAssociationByTagidBodyParam, PostApiGroupsByTaggroupidAssociationByTagidMetadataParam, PostApiGroupsByTaggroupidAssociationByTagidResponse200, PostApiResponse200, PostApiTagGroupsBodyParam, PostApiTagGroupsResponse200, PostAppsByAppidJobsBodyParam, PostAppsByAppidJobsMetadataParam, PostAppsByAppidJobsResponse201, PostByParentdomainAssetsDomainsBodyParam, PostByParentdomainAssetsDomainsMetadataParam, PostByParentdomainAssetsDomainsResponse200, PostByParentdomainAssetsIpsBodyParam, PostByParentdomainAssetsIpsMetadataParam, PostByParentdomainAssetsIpsResponse200, PostCompaniesBulkSearchesBodyParam, PostCompaniesBulkSearchesResponse201, PostCompaniesDomainIssuesTypeFeedbackBodyParam, PostCompaniesDomainIssuesTypeFeedbackMetadataParam, PostCompaniesDomainIssuesTypeFeedbackValidationRequestBodyParam, PostCompaniesDomainIssuesTypeFeedbackValidationRequestMetadataParam, PostCustomScorecardsBodyParam, PostCustomScorecardsResponse200, PostInvitationsBodyParam, PostPlansArchiveBodyParam, PostPlansByIdGuestsBodyParam, PostPlansByIdGuestsMetadataParam, PostPlansByIdGuestsResponse201, PostPlansFactorScoreImprovementBodyParam, PostPlansFactorScoreImprovementResponse201, PostPlansIssueResolutionBodyParam, PostPlansIssueResolutionResponse201, PostPlansOverallScoreImprovementBodyParam, PostPlansOverallScoreImprovementResponse201, PostPlansUnarchiveBodyParam, PostPortfoliosBodyParam, PostPortfoliosResponse200, PostReportsDetailedBodyParam, PostReportsDetailedResponse200, PostReportsEventsJsonBodyParam, PostReportsEventsJsonResponse200, PostReportsFootprintDomainsBodyParam, PostReportsFootprintDomainsResponse200, PostReportsFootprintIpsBodyParam, PostReportsFootprintIpsResponse200, PostReportsFullScorecardJsonBodyParam, PostReportsFullScorecardJsonResponse200, PostReportsIssuesBodyParam, PostReportsIssuesResponse200, PostReportsPartnershipBodyParam, PostReportsPartnershipResponse200, PostReportsPortfolioBodyParam, PostReportsPortfolioResponse200, PostReportsScorecardFootprintBodyParam, PostReportsScorecardFootprintResponse200, PostReportsSummaryBodyParam, PostReportsSummaryResponse200, PostScorecardTagsBodyParam, PostScorecardTagsBulkDeleteBodyParam, PostScorecardTagsGroupsBodyParam, PostScorecardTagsGroupsResponse200, PostScorecardTagsIdCompaniesDomainMetadataParam, PostScorecardTagsIdCompaniesDomainResponse200, PostScorecardTagsResponse200, PostScorecardTagsTagIdGroupsTagGroupIdMetadataParam, PutApiByTagidBodyParam, PutApiByTagidMetadataParam, PutApiByTagidResponse200, PutApiTagGroupsByIdBodyParam, PutApiTagGroupsByIdMetadataParam, PutApiTagGroupsByIdResponse200, PutAppsByAppidJobsByJobidBodyParam, PutAppsByAppidJobsByJobidMetadataParam, PutAppsByAppidJobsByJobidResponse200, PutCustomScorecardsIdMetadataParam, PutPortfoliosCompaniesBulkUploadBodyParam, PutPortfoliosCompaniesBulkUploadMetadataParam, PutPortfoliosPortfolioIdBodyParam, PutPortfoliosPortfolioIdCompaniesDomainMetadataParam, PutPortfoliosPortfolioIdCompaniesDomainResponse200, PutPortfoliosPortfolioIdCompaniesDomainResponse400, PutPortfoliosPortfolioIdCompaniesDomainResponse401, PutPortfoliosPortfolioIdCompaniesDomainResponse403, PutPortfoliosPortfolioIdCompaniesDomainResponse404, PutPortfoliosPortfolioIdCompaniesDomainResponse429, PutPortfoliosPortfolioIdMetadataParam, PutPortfoliosPortfolioIdResponse200, PutScorecardTagsGroupsIdBodyParam, PutScorecardTagsGroupsIdMetadataParam, PutScorecardTagsGroupsIdResponse200, PutScorecardTagsIdBodyParam, PutScorecardTagsIdMetadataParam, PutScorecardTagsIdResponse200 } from './types';
